const express = require("express");
const samayController = require("../controllers/samayController");

const router = express.Router();

router.get("/", samayController.all_samays);
router.get("/:id", samayController.samay_by_id);
router.delete("/:id", samayController.delete_samay_by_id);
// router.post("/", raagController.create_raag);
router.post("/", samayController.add_samay);
module.exports = router;
