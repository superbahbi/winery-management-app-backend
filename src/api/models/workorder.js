'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkOrder = sequelize.define('WorkOrder', {
    won: DataTypes.STRING,
    schedule: DataTypes.STRING,
    issueby: DataTypes.STRING,
    assignto: DataTypes.STRING,
    category: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  WorkOrder.associate = function(models) {
    // associations can be defined here
  };
  return WorkOrder;
};