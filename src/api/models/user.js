"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const moment = require("moment");
const { jwtSecret, jwtExpirationInterval } = require("../../config/vars");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      name: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: user => {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.prototype.token = () => {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, "minutes")
        .unix(),
      iat: moment().unix(),
      sub: this.id
    };
    return jwt.encode(playload, jwtSecret);
  };
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
