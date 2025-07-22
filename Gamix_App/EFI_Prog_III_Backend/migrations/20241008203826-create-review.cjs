'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Review', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    game_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Game',
        key: 'id'
      },
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
    },
    rating: {
      type: Sequelize.INTEGER
    },
    comment: {
      type: Sequelize.TEXT
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Review');
}