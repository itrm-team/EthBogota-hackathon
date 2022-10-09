"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      const param_list = ["id_transaction_status", "status"];

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
      TransactionStatus.hasMany(models['Transactions'], { foreignKey: 'id_transaction_status' })
    }
  }
  TransactionStatus.init(
    {
      id_transaction_status: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        //no default value
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "TransactionStatus",
      modelName: "TransactionStatus",
    }
  );
  return TransactionStatus;
};
