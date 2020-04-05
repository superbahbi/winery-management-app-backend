'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Analyses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      labID: {
        type: Sequelize.STRING
      },
      metric: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      vessel: {
        type: Sequelize.STRING
      },
      batch: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      action: {
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
    return queryInterface.dropTable('Analyses');
  }
};