'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const hashPassword = (await import('../src/helpers/hashPassword.cjs')).default;
  
  await queryInterface.bulkInsert('User', [{
    userName: 'Manu',
    passWord: await hashPassword('Manu5*'),
    email: 'manu@nba.com',
    role: 'admin'
  }, {
    userName: 'Chapu',
    passWord: await hashPassword('Chapu5*'),
    email: 'chapu@nba.com',
    role: 'gamer'
  },
  ], {});

}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('User', null, {});
}