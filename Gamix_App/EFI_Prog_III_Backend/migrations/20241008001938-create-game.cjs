'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Game', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    },
    platform: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    },
    available: {
      type: Sequelize.BOOLEAN
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Game');
}