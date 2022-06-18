const Raag = require("../models/raag");
const Samay = require("../models/samay");
const { samay_by_id } = require("./samayController");

const get_videos_by_client_localtime = (req, res) => {
  const hour = parseInt(req.params.localtime.split("_")[0]);
  Samay.findOne({
    startTime: { $lte: hour },
    endTime: { $gt: hour },
  })
    .then((samay) => {
      if (samay) {
        console.log("samay=", samay);

        Raag.find({ partOfDay: samay.id })
          .then((raag) => {
            res.json(raag);
          })
          .catch((err) => {
            res.status(500).send();
            console.log(err);
          });
      } else {
        console.log("Can't found samay");
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("Can't found samay", err);
      res.status(500).send();
    });
};

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
const delete_raag_by_id = (req, res) => {
  Raag.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (result) res.json(result);
      else {
        console.log("raag not found");
        res.status(404).send();
      }
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
const add_raag = (req, res) => {
  Samay.findOne({ name: req.body.samay })
    .then((result) => {
      const raag = new Raag({
        name: req.body.name,
        partOfDay: result,
        thaat: req.body.thaat,
      });
      raag
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log("ERR", err);
          res.status(500).send();
        });
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};
module.exports = {
  all_raags,
  raag_by_id,
  add_raag,
  delete_raag_by_id,
  get_videos_by_client_localtime,
};
