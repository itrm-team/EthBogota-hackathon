"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExchangeRate extends Model {
    /**
     * Helper method for definSing associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      console.log("got body for user balance", body);
      const param_list = [
        "id_base_currency",
        "id_quote_currency",
        "buy_rate",
        "sell_rate",
      ];

      let new_body = {};

      for (let param of param_list) {
        new_body[param] = body[param];
      }

      new_body["createdAt"] = new Date()
        .toISOString()
        .replace(/T/g, " ")
        .replace(/Z/g, "")
        .replace(/z/g, "");

      new_body["valid_for"] = new Date()
        .toISOString()
        .replace(/T/g, " ")
        .replace(/Z/g, "")
        .replace(/z/g, "");
      return new_body;
    }

    static associate(models) {
      // define association here
      ExchangeRate.belongsTo(models["Currency"], {
        as: "baseCurrency",
        foreignKey: "id_base_currency",
      });
      ExchangeRate.belongsTo(models["Currency"], {
        as: "quoteCurrency",
        foreignKey: "id_quote_currency",
      });
    }
  }
  ExchangeRate.init(
    {
      id_exchange_rate: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
      id_base_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      id_quote_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      buy_rate: { type: DataTypes.STRING, allowNull: false },
      sell_rate: { type: DataTypes.STRING, allowNull: false },
      valid_for: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      
    },
    {
      sequelize,
      freezeTableName: true,
      tableName: "ExchangeRate",
      modelName: "ExchangeRate",
    }
  );
  return ExchangeRate;
};
