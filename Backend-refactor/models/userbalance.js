"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      console.log(">>balance Data:", body);
      const param_list = ["id_user", "balance", "id_currency"];

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
      UserBalance.belongsTo(models['Users'], { foreignKey: 'id_user' });
      UserBalance.belongsTo(models['Currency'], { foreignKey: 'id_currency' });
    }
  }
  UserBalance.init(
    {
      id_balance: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
          model: { tableName: "users" },
          key: "id_user",
        },
      },
      balance: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      id_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: { tableName: "currency" },
          key: "id_currency",
        },
      },
    },
    {
      sequelize,
      tableName: "UserBalance",
      modelName: "UserBalance",
    }
  );
  return UserBalance;
};
