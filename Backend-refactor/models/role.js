"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static checkPostParams(body) {
      const param_list = ["role", "id_role"];

      let new_body = {};

      for (let param of param_list) {
        if (!body[param]) return false;
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
      Role.hasMany(models['Users'], { foreignKey: 'id_role' });
    }
  }
  Role.init(
    {
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true // agregado.
      },
      id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
    },
    {
      sequelize,
      tableName: "Role",
      modelName: "Role",
    }
  );
  return Role;
};
