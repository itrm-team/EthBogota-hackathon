"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id_transaction: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      transaction_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      id_user: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: { tableName: "Users" },
          key: "id_user",
        },
      },
      id_transaction_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "TransactionTypes" },
          key: "id_transaction_type",
        },
      },
      id_transaction_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "TransactionStatus" },
          key: "id_transaction_status",
        },
      },
      id_exchange_rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "ExchangeRate" },
          key: "id_exchange_rate",
        },
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      comission: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      metadata: {
        type: Sequelize.JSONB,
        allowNull: false,
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
    await queryInterface.dropTable("Transactions");
  },
};
