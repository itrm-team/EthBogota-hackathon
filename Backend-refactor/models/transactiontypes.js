"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      const param_list = ["id_transaction_type", "type"];

      let new_body = {};

      for (let param of param_list) {
        new_body[param] = body[param];
      }
      new_body["createdAt"] = new Date()
        .toISOString()
        .replace(/T/g, " ")
        .replace(/Z/g, "")
        .replace(/z/g, "");
      return new_body;
    }
    static associate(models) {
      // define association here
      TransactionTypes.hasMany(models["Transactions"], {
        foreignKey: "id_transaction_type",
      });
    }
  }
  TransactionTypes.init(
    {
      id_transaction_type: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "TransactionTypes",
      modelName: "TransactionTypes",
    }
  );
  return TransactionTypes;
};
