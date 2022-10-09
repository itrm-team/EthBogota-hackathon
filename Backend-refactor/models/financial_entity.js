"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FinancialEntity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      console.log("got body for financial entity", body);
      const param_list = ["id_financial_entity", "name", "id_currency"];

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
      FinancialEntity.belongsTo(models["Currency"], {
        as: "currency",
        foreignKey: "id_currency",
      });
    }
  }
  FinancialEntity.init(
    {
      id_financial_entity: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      id_currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "Currency" },
          key: "id_currency",
        },
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          BSB_code: { type: DataTypes.INTEGER, allowNull: true },
          Num_institution: { type: DataTypes.INTEGER, allowNull: true },
          IBAM: { type: DataTypes.INTEGER, allowNull: true },
          UK_code: { type: DataTypes.INTEGER, allowNull: true },
          CLABE: { type: DataTypes.INTEGER, allowNull: true },
          ACH: { type: DataTypes.INTEGER, allowNull: true },
        },
      },
    },
    {
      sequelize,
      modelName: "FinancialEntity",
      tableName: "FinancialEntity",
      freezeTableName: true,
    }
  );
  return FinancialEntity;
};
