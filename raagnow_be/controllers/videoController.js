const Video = require("../models/video");
const Raag = require("../models/raag");
require("dotenv").config();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

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
const search_youtube_videos_per_raag = async (req, res) => {
  const raag = req.params.raag;
  const SEARCH_KEYWORD_ENDPOINT =
    "https://youtube.googleapis.com/youtube/v3/search";
  let response = await fetch(
    `${SEARCH_KEYWORD_ENDPOINT}?part=snippet&maxResults=25&q=${raag}+raag&key=${YOUTUBE_API_KEY}`
  );
  const body = await response.json();

  // console.log("body", body);
  const BreakError = {};
  try {
    for (let item of body.items) {
      // console.log(item.id.videoId);
      // console.log(item.snippet.title);
      // console.log(item.snippet.description);
      // console.log(item.snippet.publishedAt);
      // console.log(item.snippet.thumbnails.default);
      req.body = {
        type: "youtube",
        externalId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.default.url,
      };
      await add_video(req, res);
    }
    res.status(201).send(body.items);
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
  search_youtube_videos_per_raag,
};
