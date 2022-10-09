"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"UserBalance",
			[
				{
					id_user: "78bf7965-dbe6-429c-922c-2060775eb0e5",
					balance: 99,
					id_currency: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
        {
					id_user: "78bf7965-dbe6-429c-922c-2060775eb0e7",
					balance: 0,
					id_currency: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.bulkDelete("UserBalance", null, {});
	},
};
