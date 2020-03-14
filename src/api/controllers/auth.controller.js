const httpStatus = require("http-status");
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
          res.status(httpStatus.UNAUTHORIZED);
          res.json({
            message: "Invalid username or password"
          });
          return;
        } else if (!user.validPassword(req.body.password)) {
          res.status(httpStatus.UNAUTHORIZED);
          res.json({
            message: "Invalid username or password"
          });
          return;
        } else {
          // TODO  transform user to exclude password hash
          res.status(httpStatus.OK);
          const token = user.token();
          res.status(200).json({ token: token, user: user });
          return;
        }
      } else {
        res.status(httpStatus.UNAUTHORIZED);
        res.json({
          message: "Invalid username or password"
        });
        return;
      }
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR);
      res.json({
        message: "Some error occurred while logging in."
      });
    });
};
exports.register = async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    res.status(httpStatus.UNAUTHORIZED);
    res.json({
      message: "Invalid input data. Please try again"
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
      res.status(httpStatus.CREATED);
      res.json({ token: token, user: user });
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
        status: false,
        response: message
      });
    });
};
exports.refresh = async (req, res, next) => {
  res.json("refresh");
};
