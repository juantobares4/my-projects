'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('CartItem', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    cart_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Cart',
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
  await queryInterface.dropTable('CartItem');
}