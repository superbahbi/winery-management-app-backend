"use strict";
module.exports = (sequelize, DataTypes) => {
  const Vessel = sequelize.define(
    "Vessel",
    {
      vesselCode: DataTypes.STRING,
      batchCode: DataTypes.STRING,
      type: DataTypes.STRING,
      currentVolume: DataTypes.STRING,
      maxVolume: DataTypes.STRING,
      status: DataTypes.STRING,
      toast: DataTypes.STRING,
      cooper: DataTypes.STRING
    },
    {}
  );
  Vessel.associate = function(models) {
    // associations can be defined here
  };
  return Vessel;
};
