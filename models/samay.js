const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const samaySchema = new Schema(
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
      required: True,
    },
    endTime: {
      type: Number,
      required: True,
    },
  },
  { timestamps: true }
);

const Samay = mongoose.model("Samay", samaySchema);
module.exports = Samay;
