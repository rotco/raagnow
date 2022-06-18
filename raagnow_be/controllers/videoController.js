const Video = require("../models/video");
const Raag = require("../models/raag");

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
  const API_KEY = "AIzaSyAJZfeg5w_gEsV8kEvrh4-RHd7QeuUMuts";
  let response = await fetch(
    `${SEARCH_KEYWORD_ENDPOINT}?part=snippet&maxResults=25&q=${raag}+raag&key=${API_KEY}`
  );
  let body = await response.json();
  res.send(body.items);

  console.log("body", body);
  const BreakError = {};
  try {
    body.items.forEach((item) => {
      console.log(item.snippet);
      throw BreakError;
    });
  } catch (err) {
    if (err !== BreakError) throw err;
  }
};
const add_video = (req, res) => {
  Raag.find({ name: req.body.raag }).then((raag) => {
    const video = new Video({
      type: req.body.type,
      title: req.body.title,
      description: req.body.description,
      externalId: req.body.externalId,
      raag: raag._id,
      likes: req.body.type,
      dislikes: req.body.type,
    });
    video
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  });
};
module.exports = {
  all_videos,
  video_by_id,
  add_video,
  delete_video_by_id,
  search_youtube_videos_per_raag,
};
