const Samay = require("../models/samay");

const all_samay = (req, res) => {
  Samay.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

const samay_by_id = (req, res) => {
  Samay.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

module.exports = {
  all_samay,
  samay_by_id,
};
