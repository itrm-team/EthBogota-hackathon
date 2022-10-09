"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static checkPostParams(body) {
			const param_list = [
        "id_currency",
        "name",
        "ticker",
        "decimals",
        "type"
			];

			let new_body = {};

			for (let param of param_list) {
				new_body[param] = body[param];
			}

			new_body['createdAt'] = new Date().toISOString().replace(/T/g, ' ').replace(/Z/g,'').replace(/z/g, '');

			return new_body;
		}

    static associate(models) {
      // define association here
      Currency.hasMany(models["UserBalance"], { foreignKey: "id_currency" });
      Currency.hasMany(models["Transactions"], { foreignKey: "id_currency" });
      Currency.hasMany(models["ExchangeLimits"], { foreignKey: "id_currency" });
      Currency.hasMany(models["FinancialEntity"], { foreignKey: "id_currency" });
      Currency.hasMany(models["ExchangeRate"], {
        foreignKey: "id_base_currency",
      });
    }
  }
  Currency.init(
    {
      id_currency: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      ticker: { type: DataTypes.STRING, allowNull: false },
      decimals: { type: DataTypes.INTEGER, defaultValue: 2, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false, defaultValue: "FIAT" },
    },
    {
      sequelize,
      freezeTableName: true,
      modelName: "Currency",
      tableName: "Currency",
    }
  );
  return Currency;
};
