"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExchangeLimits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      console.log("Got body exchange limits: ", body)
      const param_list = ["id_exchange_limits", "max_limit", "min_limit", "id_currency"];

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
      ExchangeLimits.belongsTo(models["Currency"], {
        as: "currency",
        foreignKey: "id_currency",
      });
    }
  }
  ExchangeLimits.init(
    {
      id_exchange_limits: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      max_limit: { type: DataTypes.INTEGER, allowNull: false },
      min_limit: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "ExchangeLimits",
      modelName: "ExchangeLimits",
    }
  );
  return ExchangeLimits;
};
