'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vessels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vesselCode: {
        type: Sequelize.STRING
      },
      batchCode: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      currentVolume: {
        type: Sequelize.STRING
      },
      maxVolume: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      toast: {
        type: Sequelize.STRING
      },
      cooper: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Vessels');
  }
};