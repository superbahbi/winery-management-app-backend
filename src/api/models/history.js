'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    action: DataTypes.STRING,
    time: DataTypes.STRING,
    date: DataTypes.STRING,
    user: DataTypes.STRING
  }, {});
  History.associate = function(models) {
    // associations can be defined here
  };
  return History;
};