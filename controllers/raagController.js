const Raag = require("../models/raag");

const all_raags = (req, res) => {
  Raag.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

const raag_by_id = (req, res) => {
  Raag.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

module.exports = {
  all_raags,
  raag_by_id,
};
