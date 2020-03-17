const express = require("express");
const controller = require("../../controllers/batch.controller");
const router = express.Router();
router.route("/").get(controller.all);
router.route("/add").post(controller.add);

module.exports = router;
