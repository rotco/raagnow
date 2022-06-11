const Samay = require("../models/samay");

const all_samays = (req, res) => {
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
const delete_samay_by_id = (req, res) => {
  Samay.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (result) res.json(result);
      else {
        console.log("samay not found");
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
const add_samay = (req, res) => {
  const samay = new Samay({
    name: "Midnight",
    startTime: 20,
    endTime: 22,
  });
  samay
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
module.exports = {
  all_samays,
  samay_by_id,
  add_samay,
  delete_samay_by_id,
};
