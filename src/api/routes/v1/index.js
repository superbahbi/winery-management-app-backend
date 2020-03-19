const express = require("express");
// const userRoutes = require("./user.route");
const authRoutes = require("./auth.route");
const batchRoutes = require("./batch.route");
const vesselRoutes = require("./vessel.route");
const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));
// router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/batch", batchRoutes);
router.use("/vessel", vesselRoutes);

module.exports = router;
