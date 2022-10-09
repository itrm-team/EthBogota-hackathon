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
      "Currency",
      [
        {
          id_currency: 1,
          name: "DÓLAR",
          ticker: "USDC",
          decimals:2,
          type:"CRYPTO",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 2,
          name: "PESOS COLOMBIANOS",
          ticker: "COP",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 3,
          name: "EURO",
          ticker: "EUR",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 4,
          name: "DÓLAR CANADIENSE",
          ticker: "CAD",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 5,
          name: "LIBRA ESTERLINA",
          ticker: "GBP",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 6,
          name: "PESOS MEXICANOS",
          ticker: "MXN",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 7,
          name: "DÓLAR AUSTRALIANO",
          ticker: "AUD",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 8,
          name: "DÓLAR ESTADOUNIDENSE",
          ticker: "USD",
          decimals:2,
          type:"FIAT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_currency: 9,
          name: "DÓLAR TETHER",
          ticker: "USDT",
          decimals:2,
          type:"CRYPTO",
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
     await queryInterface.bulkDelete("Currency", null, {});
  }
};
