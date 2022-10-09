'use strict';

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
      "ExchangeLimits",
      [
        {
          id_exchange_limits: 1,
          id_currency: 1,
          max_limit: 5000,
          min_limit: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]
     )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ExchangeLimits', null, {});
  }
};
