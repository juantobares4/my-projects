'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  await queryInterface.bulkInsert('Game', [{
    title: 'FIFA 2024',
    genre: 'Sports',
    platform: 'XBOX',
    price: 400,
    available: true,
  }, {
    title: 'God of War',
    genre: 'Adventure',
    platform: 'PLAYSTATION',
    price: 100.50,
    available: true,
  }, {
    title: 'The Last of Us II',
    genre: 'Survival',
    platform: 'NINTENDO',
    price: 119.7,
    available: true,
  },  {
    title: 'Mario Kart',
    genre: 'Sports',
    platform: 'PLAYSTATION',
    price: 90.99,
    available: false,
  }, 
  {
    title: 'Red Dead Redemption II',
    genre: 'RPG',
    platform: 'XBOX',
    price: 599.99,
    available: true,
  }, {
    title: 'Pokemon - Pikachu Action',
    genre: 'Platform',
    platform: 'NINTENDO',
    price: 800,
    available: true,
  }, {
    title: 'Black Myth: Wukong',
    genre: 'RPG',
    platform: 'PC',
    price: 740,
    available: true,
  },{
    title: 'Dishonored 2',
    genre: 'Discretion',
    platform: 'PC',
    price: 740,
    available: true,
  },
  ], {});

}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Game', null, {});
}
