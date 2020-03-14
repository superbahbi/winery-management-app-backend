const User = require("../models").User;

exports.login = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  User.findOne({ where: { username: req.body.username } })
    .then(user => {
      if (user) {
        if (!user) {
          res.status(400).json("Invalid username or password");
        } else if (!user.validPassword(req.body.password)) {
          res.status(400).json("Invalid username or password");
        } else {
          // TODO  transform user to exclude password hash
          const token = user.token();
          res.status(200).json({ token: token, user: user });
        }
      } else {
        res.status(400).json("Cant find user");
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while logging in."
      });
    });
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
    fullname: req.body.fullname,
    email: req.body.email,
    role: "registered"
  };
  // TODO Check if password is match
  User.create(newUser)
    .then(user => {
      // TODO  transform data to exclude password hash
      const token = user.token();
      res.status(200).json({ token: token, user: user });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new user."
      });
    });
};
exports.refresh = async (req, res, next) => {
  res.json("refresh");
};
