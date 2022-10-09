"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */

		static hashPassword(password) {
			const salt = bcrypt.genSaltSync(10);
			return bcrypt.hashSync(password, salt);
		}

		static checkPostParams(body) {
			
			const param_list = ["id_role", "password", "email", "contador" , "statusTutorial", "active", "metadata"];

			let new_body = {};

			for (let param of param_list) {
				new_body[param] = body[param];
			}

			new_body["id_user"] = new_body["id_user"]
				? new_body["id_user"]
				: uuidv4();
			new_body["password"] = this.hashPassword(body["password"]);
			new_body["createdAt"] = new Date()
				.toISOString()
				.replace(/T/g, " ")
				.replace(/Z/g, "")
				.replace(/z/g, "");
      new_body["metadata"] = {
		contador:new_body["contador"] = 0,
        numberQ1:body["numberQ1"],
        numberQ2:body["numberQ2"],
        questionR1:body["questionR1"],
        questionR2:body["questionR2"],
        updatedKYCAt:new_body["createdAt"],
		statusTutorial:new_body["statusTutorial"] = true,
		fraudCheckId:new_body["fraudCheckId"] = "",
		timerUpdate:new_body["timerUpdate"] = new Date(),
      }
			return new_body;
		}

		static changePassword(newPassword, newPasswordRepeat) {
			if (newPassword !== newPasswordRepeat) return null;
			const hash = this.hashPassword(newPassword);
			return hash;
		}

		static generateRandomCode() {
			return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		}

		static associate(models) {
			Users.belongsTo(models["Role"], { foreignKey: "id_role" });
			Users.hasOne(models["UserBalance"], { foreignKey: "id_user" });
			Users.hasMany(models["Transactions"], { foreignKey: "id_user" });
		}
	}
	Users.init(
		{
			id_user: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				unique: true,
				allowNull: false,
				primaryKey: true,
			},
			id_role: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 2,
				references: {
					model: { tableName: "role" },
					key: "id_role",
				},
			},
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			password: { type: DataTypes.STRING, allowNull: false },		
			metadata: {
				type: DataTypes.JSONB,
				allowNull: false,
				defaultValue: {
					fraudCheckId: { type: DataTypes.STRING, allowNull: false },
					updatedKYCAt: { type: DataTypes.DATE, allowNull: false },
					questionR1: { type: DataTypes.STRING, allowNull: false },
					numberQ1: { type: DataTypes.INTEGER, allowNull: false },
					questionR2: { type: DataTypes.STRING, allowNull: false },
					numberQ2: { type: DataTypes.INTEGER, allowNull: false },
					statusTutorial: { 
						type: DataTypes.BOOLEAN, 
						allowNull: false, 
						defaultValue: true,
					},
					contador: {
						type: DataTypes.INTEGER,
						allowNull: false,
						defaultValue: 0,
					},
					timerUpdate: {
						type: DataTypes.DATE,
						allowNull: false,
					},
				},
			},
		},

		{
			sequelize,
			modelName: "Users",
			tableName: "Users",
			freezeTableName: true,
		}
	);
	return Users;
};
