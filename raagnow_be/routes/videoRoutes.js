const express = require("express");
const videoController = require("../controllers/videoController");
const router = express.Router();
router.get("/", videoController.all_videos);
router.get("/:id", videoController.video_by_id);
router.delete("/:id", videoController.delete_video_by_id);
// router.post("/", raagController.create_raag);
router.post("/", videoController.add_video);
router.get(
  "/by-localtime/:localtime",
  videoController.get_videos_by_client_localtime
);
router.put(
  "/raag-update/:raag",
  videoController.update_youtube_videos_per_raag
);
router.put("/raag-update-all", videoController.update_youtube_videos_all_raags);

module.exports = router;
