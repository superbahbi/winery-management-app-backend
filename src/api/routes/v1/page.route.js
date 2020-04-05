const express = require("express");
const batchController = require("../../controllers/batch.controller");
const vesselController = require("../../controllers/vessel.controller");
const workorderController = require("../../controllers/workorder.controller");
const analysisController = require("../../controllers/analysis.controller");
const historyController = require("../../controllers/history.controller");
const inventoryController = require("../../controllers/inventory.controller");
const router = express.Router();
router
  .route("/batch")
  .get(batchController.all)
  .post(batchController.add)
  .put(batchController.edit)
  .delete(batchController.delete);
router
  .route("/vessel")
  .get(vesselController.all)
  .post(vesselController.add)
  .put(vesselController.edit)
  .delete(vesselController.delete);
router
  .route("/workorder")
  .get(workorderController.all)
  .post(workorderController.add)
  .put(workorderController.edit)
  .delete(workorderController.delete);
router
  .route("/analysis")
  .get(analysisController.all)
  .post(analysisController.add)
  .put(analysisController.edit)
  .delete(analysisController.delete);
router
  .route("/history")
  .get(historyController.all)
  .post(historyController.add)
  .put(historyController.edit)
  .delete(historyController.delete);
router
  .route("/inventory")
  .get(inventoryController.all)
  .post(inventoryController.add)
  .put(inventoryController.edit)
  .delete(inventoryController.delete);

module.exports = router;
