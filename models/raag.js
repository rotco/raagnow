const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Samay = new Schema(
  {
    name: {
      type: String,
      enum: [
        "Afternoon",
        "Late Afternoon",
        "Dusk",
        "Evening",
        "Late Evening",
        "Night",
        "Midnight",
        "Pre-dawn",
        "Dawn",
        "Early Morning",
        "Morning",
        "Late Morning",
      ],
      required: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    endTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const raagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    partOfDay: Samay,
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
