const express = require("express");
const controller = require("../../controllers/vessel.controller");
const { authorize } = require("../../middlewares/auth");
const router = express.Router();
router.route("/").get(controller.all);
router.route("/add").post(controller.add);

module.exports = router;
