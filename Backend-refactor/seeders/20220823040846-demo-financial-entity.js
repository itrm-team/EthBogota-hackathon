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
      "FinancialEntity",
      [
        {
          id_financial_entity: 1,
          name: 'Aportes en Línea',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 2,
          name: 'Banco Serfinanza',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 3,
          name: 'Asopagos',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 4,
          name: 'Bancoldex',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 5,
          name: 'Banco Agrario de Colombia',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 6,
          name: 'Bancolombia',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 7,
          name: 'Banco AV Villas',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 8,
          name: 'Bancoomeva',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 9,
          name: 'Banco BBVA',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 10,
          name: 'BNP Paribas',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 11,
          name: 'Banco BCSC',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 12,
          name: 'Coltefinanciera',
          id_currency:2,
          createdAt: new Date(),
         updatedAt: new Date(),
        },
        {
          id_financial_entity: 13,
          name: 'Banco Citibank',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 14,
          name: 'Compensar',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 15,
          name: 'Banco Coopcentral',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 16,
          name: 'Confiar Cooperativa Financiera',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 17,
          name: 'Banco Davivienda',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 18,
          name: 'Coofinep Cooperativa Financiera',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 19,
          name: 'Coofinep Cooperativa Financiera',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 20,
          name: 'Cooperativa Financiera Cotrafa',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 21,
          name: 'Banco de la República',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 22,
          name: 'Cooperativa Financiera de Antioquia',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 23,
          name: 'Banco de Occidente',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 24,
          name: 'Deceval',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 25,
          name: 'Banco Falabella',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 26,
          name: 'Dirección del Tesoro Nacional  - Regalias',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 27,
          name: 'Banco Finandina',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 28,
          name: 'Dirección del Tesoro Nacional',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 29,
          name: 'Banco GNB Sudameris',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 30,
          name: 'Enlace Operativo S.A.',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 31,
          name: 'Banco Itaú Corpbanca Colombia S.A',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 32,
          name: 'Financiera Juriscoop',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 33,
          name: 'Banco Mundo Mujer',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 34,
          name: 'Banco JP Morgan Colombia',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 35,
          name: 'Banco Pichincha',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 36,
          name: 'Mibanco S.A',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 37,
          name: 'Banco Popular',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 38,
          name: 'Red Multibanca Colpatria',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 39,
          name: 'Banco Credifinanciera',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 40,
          name: 'Simple S.A',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 41,
          name: 'Banco Santander de Negocios Colombia S.A.',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 42,
          name: 'FOGAFIN',
          id_currency:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_financial_entity: 43,
          name: 'Bancamia S.A',
          id_currency:2,
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
     await queryInterface.bulkDelete('FinancialEntity', null, {});
    },
};
