'use strict';
module.exports = (sequelize, DataTypes) => {
  const Analysis = sequelize.define('Analysis', {
    labID: DataTypes.STRING,
    metric: DataTypes.STRING,
    value: DataTypes.STRING,
    status: DataTypes.STRING,
    vessel: DataTypes.STRING,
    batch: DataTypes.STRING,
    date: DataTypes.DATE,
    action: DataTypes.STRING
  }, {});
  Analysis.associate = function(models) {
    // associations can be defined here
  };
  return Analysis;
};