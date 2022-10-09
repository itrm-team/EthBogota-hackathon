'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id_user: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, unique: true, allowNull: false, primaryKey: true,
      },
      id_role: {
        type: Sequelize.INTEGER, allowNull: false,defaultValue:2, references:{
          model: { tableName: "Role" },
          key: "id_role",
        },
      },
      email: {
        type: Sequelize.STRING, allowNull: false, unique: true
      },
      password: {
       type: Sequelize.STRING, allowNull: false,
      },
      metadata: {
        type: Sequelize.JSONB, allowNull: false, defaultValue: {
          updatedKYCAt: new Date().toISOString() ,
          questionR1: 'a',
          numberQ1: 1,
          questionR2: 'b',
          numberQ2: 2,
          statusTutorial: true,
          contador: 0,
          fraudCheckId: "",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};