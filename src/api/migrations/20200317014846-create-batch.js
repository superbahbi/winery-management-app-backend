"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Batches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      vintage: {
        type: Sequelize.STRING
      },
      varietal: {
        type: Sequelize.STRING
      },
      clone: {
        type: Sequelize.STRING
      },
      vineyard: {
        type: Sequelize.STRING
      },
      appellation: {
        type: Sequelize.STRING
      },
      stage: {
        type: Sequelize.INTEGER
      },
      volume: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Batches");
  }
};
