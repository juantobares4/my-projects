'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('PurchaseDetail', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    purchase_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Purchase',
        key: 'id'
      },
    },
    game_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Game',
        key: 'id'
      },
    },
    quantity: {
      type: Sequelize.INTEGER
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('PurchaseDetail');
}