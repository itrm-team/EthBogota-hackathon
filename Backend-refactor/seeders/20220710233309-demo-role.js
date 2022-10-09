"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          id_role:0,
          role: "SUPER ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_role:1,
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_role:2,
          role: "BASIC",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Role", null, {});
  },
};
