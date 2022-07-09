const Video = require("../models/video");
const Raag = require("../models/raag");
const Samay = require("../models/samay");
require("dotenv").config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const get_videos_by_client_localtime = (req, res) => {
  const hour = parseInt(req.params.localtime.split("_")[0]);
  Samay.findOne({
    startTime: { $lte: hour },
    endTime: { $gt: hour },
  })
    .then((samay) => {
      if (samay) {
        console.log("samay=", samay);
        Raag.find({ partOfDay: samay.id })
          .then((raag) => {
            res.json(raag);
          })
          .catch((err) => {
            res.status(500).send();
            console.log(err);
          });
      } else {
        console.log("Can't found samay");
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("Can't found samay", err);
      res.status(500).send();
    });
};
const all_videos = (req, res) => {
  Video.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

const video_by_id = (req, res) => {
  Video.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
const delete_video_by_id = (req, res) => {
  Video.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (result) res.json(result);
      else {
        console.log("video not found");
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
const update_youtube_videos_all_raags = async (req, res) => {
  await Raag.find().then((results) => {
    for (let raag of results) {
      console.log(raag.name);
      req.params.raag = raag.name;
      update_youtube_videos_per_raag(req, res);
    }
  });
};
const update_youtube_videos_per_raag = async (req, res) => {
  const raag = req.params.raag;
  const SEARCH_KEYWORD_ENDPOINT =
    "https://youtube.googleapis.com/youtube/v3/search";
  let response = await fetch(
    `${SEARCH_KEYWORD_ENDPOINT}?part=snippet&maxResults=25&q=${raag}+raag&key=${YOUTUBE_API_KEY}`
  );
  const body = await response.json();
  const BreakError = {};
  try {
    let newVideos = [];
    for (let item of body.items) {
      // console.log(item.id.videoId);
      // console.log(item.snippet.title);
      // console.log(item.snippet.description);
      // console.log(item.snippet.publishedAt);
      // console.log(item.snippet.thumbnails.default);
      await Video.findOne({ externalId: item.id.videoId }).then((result) => {
        if (!result) {
          console.log("thats a new video, let's add it to our DB");
          req.body = {
            type: "youtube",
            externalId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.default.url,
          };
          newVideos.push(req.body);
          add_video(req, res);
        }
      });
    }
    res.status(201).send(newVideos);
  } catch (err) {
    if (err !== BreakError) throw err;
  }
};
const add_video = async (req, res) => {
  await Raag.findOne({ $regex: new RegExp(req.params.raag, "i") }).then(
    (raag) => {
      const video = new Video({
        type: req.body.type,
        title: req.body.title,
        description: req.body.description,
        externalId: req.body.externalId,
        publishedAt: req.body.publishedAt,
        thumbnail: req.body.thumbnail,
        raag: raag._id,
        // likes: req.body.type,
        // dislikes: req.body.type,
      });
      video
        .save()
        .then((result) => {
          // console.log(result);
          // res.status(201).send();
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  );
};
module.exports = {
  all_videos,
  video_by_id,
  add_video,
  delete_video_by_id,
  update_youtube_videos_per_raag,
  get_videos_by_client_localtime,
  update_youtube_videos_all_raags,
};
