'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Cart', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Cart');
}