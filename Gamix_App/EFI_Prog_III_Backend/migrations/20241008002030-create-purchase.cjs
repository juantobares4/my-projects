'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Purchase', {
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
    date: {
      type: Sequelize.DATE
    },
    total: {
      type: Sequelize.DECIMAL
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Purchase');
}