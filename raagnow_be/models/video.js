const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["youtube", "vimeo"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
      required: true,
    },
    raag: {
      type: ObjectId,
      required: true,
    },
    likes: {
      type: Number,
    },
    dislikes: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
