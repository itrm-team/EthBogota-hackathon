"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      const param_list = [
        "id_transaction",
        "transaction_time",
        "id_user",
        "id_transaction_type",
        "id_transaction_status",
        "id_exchange_rate",
        "total",
        "commission",
        "metadata",
        "createdAt",
        "updatedAt",
      ];

      let new_body = {};

      for (let param of param_list) {
        new_body[param] = body[param];
      }
      new_body["id_transaction"] = new_body["id_transaction"]
        ? new_body["id_transaction"]
        : uuidv4();
      new_body["createdAt"] = new Date()
        .toISOString()
        .replace(/T/g, " ")
        .replace(/Z/g, "")
        .replace(/z/g, "");

      new_body["comission"] = new_body["commission"]
      new_body["metadata"]["reference"] = new_body["metadata"]["reference"] ? new_body["metadata"]["reference"] : uuidv4();
      return new_body;
    }
    static associate(models) {
      // define association here
      Transactions.belongsTo(models["TransactionStatus"], {
        foreignKey: "id_transaction_status",
      });
      Transactions.belongsTo(models["TransactionTypes"], {
        foreignKey: "id_transaction_type",
      });
      Transactions.belongsTo(models["ExchangeRate"], {
        foreignKey: "id_exchange_rate",
      });
      Transactions.belongsTo(models["Users"], { foreignKey: "id_user" });
    }
  }
  Transactions.init(
    {
      id_transaction: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      transaction_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      id_user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: { tableName: "users" },
          key: "id_user",
        },
      },
      id_transaction_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "TransactionTypes" },
          key: "id_transaction_type",
        },
      },
      id_transaction_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "TransactionStatus" },
          key: "id_transaction_status",
        },
      },
      id_exchange_rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "ExchangeRate" },
          key: "id_exchange_rate",
        },
      },
      total: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      comission: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          reference: DataTypes.STRING,
          allowNull: false,
        },
      },
    },
    {
      sequelize,
      tableName: "Transactions",
      modelName: "Transactions",
    }
  );
  return Transactions;
};
