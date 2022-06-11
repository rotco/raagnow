const express = require("express");
const raagController = require("../controllers/raagController");

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
// router.post("/", raagController.create_raag);

module.exports = router;
