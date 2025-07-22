'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  await queryInterface.bulkInsert('Review', [{
    game_id: 1,
    user_id: 1,
    rating: 1,
    comment: "Neymar esta roto!!"
  }, {
    game_id: 6,
    user_id: 2,
    rating: 5,
    comment: "Juegazo, gran impactrueno!!"
  },
  {
    game_id: 1,
    user_id: 2,
    rating: 1,
    comment: "Aguante el PES"
  },{
    game_id: 1,
    user_id: 1,
    rating: 1,
    comment: "Y el winning eleven!!"
  },
  ], {});

}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Review', null, {});
}

