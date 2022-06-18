const express = require("express");
const raagController = require("../controllers/raagController");
const videoController = require("../controllers/videoController");
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *      Raag:
 *          type: object
 *          required:
 *              - id
 *          properties:
 *              id:
 *                  type: string
 *                  description: kjhsdfkjshdfk
 */

/**
 * @swagger
 * /raags:
 *  get:
 *      summary: sdfsdfsdf
 */
router.get("/", raagController.all_raags);
router.get("/:id", raagController.raag_by_id);
router.delete("/:id", raagController.delete_raag_by_id);
// router.post("/", raagController.create_raag);
router.post("/", raagController.add_raag);
router.get(
  "/videos-by-localtime/:localtime",
  raagController.get_videos_by_client_localtime
);
router.get(
  "/search-youtube-videos-per-raag/:raag",
  videoController.search_youtube_videos_per_raag
);
module.exports = router;
