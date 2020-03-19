const httpStatus = require("http-status");
const Batch = require("../models").Batch;
exports.all = async (req, res, next) => {
  Batch.findAll({ raw: true })
    .then(batch => {
      if (batch) {
        if (!batch) {
          res.status(httpStatus.UNAUTHORIZED);
          res.json({
            message: "Invalid request"
          });
          return;
        } else {
          res.status(httpStatus.OK);
          res.status(200).json(batch);
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
        message: "Some error occurred while looking for batches."
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
  const newBatch = {
    code: req.body.batchCode,
    vintage: req.body.vintage,
    varietal: req.body.varietal,
    clone: req.body.clone,
    vineyard: req.body.vineyard,
    appellation: req.body.appellation,
    stage: req.body.stage,
    volume: req.body.volume
  };
  // TODO Check if password is match
  Batch.create(newBatch)
    .then(batch => {
      // TODO  transform data to exclude password hash
      res.status(httpStatus.CREATED);
      res.json({ batch: batch });
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
