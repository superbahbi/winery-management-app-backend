const httpStatus = require("http-status");
const WorkOrder = require("../models").WorkOrder;
exports.all = async (req, res, next) => {
  WorkOrder.findAll({ raw: true })
    .then(workOrder => {
      if (workOrder) {
        if (!workOrder) {
          res.status(httpStatus.UNAUTHORIZED);
          res.json({
            message: "Invalid request"
          });
          return;
        } else {
          res.status(httpStatus.OK);
          res.status(200).json(workOrder);
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
        message: "Some error occurred while looking for work order."
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
  const newWorkOrder = {
    won: req.body.won,
    schedule: req.body.schedule,
    type: req.body.type,
    issueby: req.body.issueby,
    assignto: req.body.assignto,
    category: req.body.category,
    status: req.body.status
  };
  // TODO Check if password is match
  WorkOrder.create(newWorkOrder)
    .then(workOrder => {
      // TODO  transform data to exclude password hash
      res.status(httpStatus.CREATED);
      res.json({ workOrder: workOrder });
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
