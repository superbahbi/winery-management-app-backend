"use strict";
module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define(
    "Batch",
    {
      batchCode: DataTypes.STRING,
      vintage: DataTypes.STRING,
      varietal: DataTypes.STRING,
      block: DataTypes.STRING,
      vineyard: DataTypes.STRING,
      appellation: DataTypes.STRING,
      stage: DataTypes.INTEGER,
      volume: DataTypes.DECIMAL,
    },
    {}
  );
  Batch.associate = function (models) {
    // associations can be defined here
  };
  return Batch;
};
