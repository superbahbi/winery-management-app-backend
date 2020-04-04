const express = require("express");
const controller = require("../../controllers/batch.controller");
const router = express.Router();
router.route("/").get(controller.all);
router.route("/add").post(controller.add);
router.route("/edit").put(controller.edit);
router.route("/delete").delete(controller.delete);

module.exports = router;
