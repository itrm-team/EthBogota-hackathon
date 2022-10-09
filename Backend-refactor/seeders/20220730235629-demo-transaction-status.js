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
      "TransactionStatus",
      [
        {
          id_transaction_status: 1,
          status: "Recibida",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_status: 2,
          status: "En validación",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_status: 3,
          status: "Aprobada",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_status: 4,
          status: "Rechazada",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_status: 5,
          status: "En proceso",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_status: 6,
          status: "Completada",
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
    await queryInterface.bulkDelete("TransactionStatus", null, {});
  },
};
