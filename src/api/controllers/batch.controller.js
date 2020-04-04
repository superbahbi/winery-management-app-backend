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
  console.log(req.body);
  if (!req.body) {
    res.status(httpStatus.UNAUTHORIZED);
    res.json({
      message: "Invalid input data. Please try again"
    });
    return;
  }
  const newBatch = {
    batchCode: req.body.batchCode,
    vintage: req.body.vintage,
    varietal: req.body.varietal,
    clone: req.body.clone,
    vineyard: req.body.vineyard,
    appellation: req.body.appellation,
    stage: req.body.stage,
    volume: req.body.volume
  };
  Batch.create(newBatch)
    .then(batch => {
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
exports.edit = async (req, res, next) => {
  if (!req.body) {
    res.status(httpStatus.UNAUTHORIZED);
    res.json({
      message: "Invalid input data. Please try again"
    });
    return;
  }
  const editBatch = {
    batchCode: req.body.batchCode,
    vintage: req.body.vintage,
    varietal: req.body.varietal,
    clone: req.body.clone,
    vineyard: req.body.vineyard,
    appellation: req.body.appellation,
    stage: req.body.stage,
    volume: req.body.volume,
    updatedAt: new Date()
  };
  Batch.update(editBatch, { where: { id: req.body.id } }).then(rowsUpdated => {
    res.status(httpStatus.OK);
    res.json({ message: rowsUpdated });
  });
};

exports.delete = async (req, res, next) => {
  if (!req.body) {
    res.status(httpStatus.UNAUTHORIZED);
    res.json({
      message: "Invalid input data. Please try again"
    });
    return;
  }
  Batch.destroy({
    where: {
      id: req.body.id
    }
  }).then(
    rowDeleted => {
      if (rowDeleted === 1) {
        res.status(httpStatus.OK);
        res.json({
          message: "Deleted successfully"
        });
      }
    },
    function(err) {
      console.log(err);
    }
  );
};
