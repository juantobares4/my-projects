'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction(t => {
    return Promise.all([
      queryInterface.addColumn(
        'User',
        'role',
        {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
        { transaction: t },
      )
    ])
  })
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction(t => {
    return Promise.all([
      queryInterface.removeColumn('User', 'role', { transaction: t }),
    ])
  })
}
