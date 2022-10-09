'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
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
      "Transactions",
      [
        {
          id_transaction: uuidv4(),
          transaction_time: new Date(),
          id_user: "78bf7965-dbe6-429c-922c-2060775eb0e5",
          id_transaction_type:1,
          id_transaction_status:1,
          id_exchange_rate:1,
          total:99,
          comission:0,
          metadata:JSON.stringify({"reference":"asdasdasdasd"}),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Transactions", null, {});
  }
};
