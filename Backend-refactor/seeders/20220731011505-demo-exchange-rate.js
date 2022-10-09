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
      "ExchangeRate",
      [
        {
          id_exchange_rate: 1,
          id_base_currency: 1,
          id_quote_currency: 8,
          buy_rate: 1,
          sell_rate: 100/105,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 2,
          id_base_currency: 2,
          id_quote_currency: 1,
          buy_rate: 1/4000,
          sell_rate: 5/4000,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 3,
          id_base_currency: 1,
          id_quote_currency: 2,
          buy_rate: 4000,
          sell_rate: 4005,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 4,
          id_base_currency: 3,
          id_quote_currency: 1,
          buy_rate: 100/95,
          sell_rate: 6/5,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 5,
          id_base_currency: 1,
          id_quote_currency: 3,
          buy_rate: 95/100,
          sell_rate: 1,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 6,
          id_base_currency: 4,
          id_quote_currency: 1,
          buy_rate: 25/32,
          sell_rate: 27/32,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 7,
          id_base_currency: 1,
          id_quote_currency: 4,
          buy_rate: 32/25,
          sell_rate: 35/25,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 8,
          id_base_currency: 5,
          id_quote_currency: 1,
          buy_rate: 100/82,
          sell_rate: 105/82,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 9,
          id_base_currency: 1,
          id_quote_currency: 5,
          buy_rate: 82/100,
          sell_rate: 85/100,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 10,
          id_base_currency: 6,
          id_quote_currency: 1,
          buy_rate: 50/1023,
          sell_rate: 3/45,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 11,
          id_base_currency: 1,
          id_quote_currency: 6,
          buy_rate: 1023/50,
          sell_rate: 41/2,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 12,
          id_base_currency: 7,
          id_quote_currency: 1,
          buy_rate: 7/10,
          sell_rate: 8/10,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 13,
          id_base_currency: 1,
          id_quote_currency: 7,
          buy_rate: 10/7,
          sell_rate: 11/7,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_exchange_rate: 14,
          id_base_currency: 1,
          id_quote_currency: 9,
          buy_rate: 1,
          sell_rate: 100/105,
          valid_for: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('ExchangeRate', null, {});
     */
     await queryInterface.bulkDelete('ExchangeRate', null, {});
  },
};
