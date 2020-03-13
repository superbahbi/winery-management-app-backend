const User = require("../models").User;

exports.login = async (req, res, next) => {
  res.json("login");
};
exports.register = async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email
  };
  User.create(newUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
exports.refresh = async (req, res, next) => {
  res.json("refresh");
};
