'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('User', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    passWord: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('User');
}
