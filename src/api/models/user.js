"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { jwtSecret, jwtExpirationInterval } = require("../../config/vars");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This username is already taken."
        },
        validate: {
          len: {
            args: [5, 50],
            msg: "Your username may be 5 to 50 characters only."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 72],
            msg: "Your password may be 5 to 72 characters only."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "This email is already taken."
        },
        validate: {
          isEmail: {
            msg: "Email address must be valid."
          }
        }
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 50],
            msg: "Your full name may be 5 to 50 characters only."
          }
        }
      },
      role: DataTypes.STRING
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
  User.prototype.token = function() {
    const playload = {
      exp: moment()
        .add(jwtExpirationInterval, "minutes")
        .unix(),
      iat: moment().unix(),
      sub: this.id,
      username: this.username
    };
    console.log(this.username);
    return jwt.sign(playload, jwtSecret);
  };
  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
