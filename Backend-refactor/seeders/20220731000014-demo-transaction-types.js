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
      "TransactionTypes",
      [
        {
          id_transaction_type: 1,
          type: "Transferencia",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_type: 2,
          type: "Retiro",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_type: 3,
          type: "Recompensa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_type: 4,
          type: "Deposito",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_type: 5,
          type: "Compra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_transaction_type: 6,
          type: "Venta",
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
     await queryInterface.bulkDelete("TransactionTypes", null, {});
  },
};
