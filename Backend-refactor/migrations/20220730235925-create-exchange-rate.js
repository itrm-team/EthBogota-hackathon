"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ExchangeRate", {
      id_exchange_rate: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_base_currency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      id_quote_currency: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      buy_rate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sell_rate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valid_for: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ExchangeRate");
  },
};
