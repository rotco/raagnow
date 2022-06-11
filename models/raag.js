const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const raagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    partOfDay: {
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
    },
    season: {
      type: String,
      required: false,
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
