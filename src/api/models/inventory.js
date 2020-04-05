'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    location: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {});
  Inventory.associate = function(models) {
    // associations can be defined here
  };
  return Inventory;
};