const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Samay = require("./samay");
const Schema = mongoose.Schema;
const raagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    synonyms: [
      {
        type: String,
      },
    ],
    partOfDay: {
      type: ObjectId,
    },
    season: {
      type: String,
    },
    thaat: {
      type: String,
      enum: [
        "Bilawal",
        "Kalyan",
        "Khamaj",
        "Bhairav",
        "Poorvi",
        "Marwa",
        "Kafi",
        "Asavari",
        "Bhairavi",
        "Todi",
      ],
    },
  },
  { timestamps: true }
);

const Raag = mongoose.model("Raag", raagSchema);
module.exports = Raag;
