"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Currency", {
      id_currency: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ticker: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      decimals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "FIAT",
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
    await queryInterface.dropTable("Currency",{
      
    });
  },
};
