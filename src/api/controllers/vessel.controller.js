const httpStatus = require("http-status");
const Vessel = require("../models").Vessel;
exports.all = async (req, res, next) => {
  Vessel.findAll({ raw: true })
    .then(vessel => {
      if (vessel) {
        if (!vessel) {
          res.status(httpStatus.UNAUTHORIZED);
          res.json({
            message: "Invalid request"
          });
          return;
        } else {
          res.status(httpStatus.OK);
          res.status(200).json(vessel);
          return;
        }
      } else {
        res.status(httpStatus.UNAUTHORIZED);
        res.json({
          message: "Invalid request"
        });
        return;
      }
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.json({
        message: "Some error occurred while looking for vessels."
      });
    });
};
exports.add = async (req, res, next) => {
  if (!req.body) {
    res.status(httpStatus.UNAUTHORIZED);
    res.json({
      message: "Invalid input data. Please try again"
    });
    return;
  }
  const newVessel = {
    vesselCode: req.body.vesselCode,
    batchCode: req.body.batchCode,
    type: req.body.type,
    currentVolume: req.body.currentVolume,
    maxVolume: req.body.maxVolume,
    status: req.body.status,
    toast: req.body.toast,
    cooper: req.body.cooper
  };
  // TODO Check if password is match
  Vessel.create(newVessel)
    .then(vessel => {
      // TODO  transform data to exclude password hash
      res.status(httpStatus.CREATED);
      res.json({ vessel: vessel });
    })
    .catch(err => {
      let message = [];
      if (err) {
        err.errors.map(e => {
          message.push({ message: e.message });
        });
      }
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.json({
        message: message
      });
    });
};
