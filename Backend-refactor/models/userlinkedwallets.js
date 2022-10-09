"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLinkedWallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      console.log(">>user link Data:", body);
      const param_list = ["id_user", "walletAddress", "trustContractAddress"];

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
      UserLinkedWallets.belongsTo(models['Users'], { foreignKey: 'id_user' });
    }
  }
  UserLinkedWallets.init(
    {
      id_link: {
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
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      trustContractAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    },
    {
      sequelize,
      tableName: "UserLinkedWallets",
      modelName: "UserLinkedWallets",
    }
  );
  return UserLinkedWallets;
};
