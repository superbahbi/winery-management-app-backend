const httpStatus = require("http-status");
const Model = require("../models").Analysis;
exports.all = async (req, res, next) => {
  Model.findAll({ raw: true })
    .then(result => {
      if (result) {
        res.status(httpStatus.OK);
        res.json(result);
        return;
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
        message: "Some error occurred while looking for data."
      });
    });
};
exports.add = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(httpStatus.OK);
    res.json([{ message: "Invalid input data. Please try again" }]);
    return;
  }
  const newData = {
    labID: req.body.labID,
    metric: req.body.metric,
    value: req.body.value,
    status: req.body.status,
    vessel: req.body.vessel,
    batch: req.body.batch,
    date: new Date(),
    action: req.body.action
  };

  Model.create(newData)
    .then(result => {
      res.status(httpStatus.CREATED);
      res.json({ result: result });
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
  if (Object.keys(req.body).length === 0) {
    res.status(httpStatus.OK);
    res.json([{ message: "Invalid input data. Please try again" }]);
    return;
  }
  const editData = {
    labID: req.body.labID,
    metric: req.body.metric,
    value: req.body.value,
    status: req.body.status,
    vessel: req.body.vessel,
    batch: req.body.batch,
    date: new Date(),
    action: req.body.action,
    updatedAt: new Date()
  };
  Model.update(editData, { where: { id: req.body.id } }).then(rowsUpdated => {
    res.status(httpStatus.OK);
    res.json({ message: rowsUpdated });
  });
};

exports.delete = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(httpStatus.OK);
    res.json([{ message: "Invalid input data. Please try again" }]);
    return;
  }
  Model.destroy({
    where: {
      // TODO: validate id
      id: req.body.id
    }
  }).then(rowDeleted => {
    if (rowDeleted === 1) {
      res.status(httpStatus.OK);
      res.json({
        message: "Deleted successfully"
      });
    }
  });
};
