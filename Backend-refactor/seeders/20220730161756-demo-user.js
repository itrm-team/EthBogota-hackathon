"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		function hashPassword(password) {
			const salt = bcrypt.genSaltSync(10);
			return bcrypt.hashSync(password, salt);
		}

		await queryInterface.bulkInsert(
			"Users",
			[
				{
					id_user: "78bf7965-dbe6-429c-922c-2060775eb0e5",
					email: "santiago.hernandez@itrmachines.com",
					password: hashPassword("Testing1."),
					id_role: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
					metadata: JSON.stringify({
						fraudCheckId: "",
						questionR1: "a",
						numberQ1: 1,
						questionR2: "b",
						numberQ2: 2,
						contador: 0,
						statusTutorial: false,
						timerUpdate: new Date(),
					}),
				},
				{
          			id_user: "78bf7965-dbe6-429c-922c-2060775eb0e7",
					email: "sebastian.rocha@itrmachines.com",
					password: hashPassword("SaCS0606."),
					id_role: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
					metadata: JSON.stringify({
						fraudCheckId: "a6672071-309c-4cd3-9f4d-65f15503c372",
						questionR1: "c",
						numberQ1: 1,
						questionR2: "d",
						numberQ2: 2,
						contador: 0,
						statusTutorial: false,
						timerUpdate: new Date(),
					}),
        },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
