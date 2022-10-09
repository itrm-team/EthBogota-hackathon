'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExchangeLimits', {
      id_exchange_limits: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_currency: {
        type: Sequelize.INTEGER, allowNull: false 
      },
      max_limit: {
        type: Sequelize.INTEGER, allowNull: false 
      },
      min_limit: {
        type: Sequelize.INTEGER, allowNull: false 
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExchangeLimits');
  }
};