'use strict';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Game = sequelize.define('Game', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'Game',
    timestamps: false
  });

  Game.associate = function (models) {
    Game.hasMany(models.PurchaseDetail, {
      foreignKey: 'game_id'
    }),
      Game.hasMany(models.Review, {
        foreignKey: 'game_id'
      })
  };

  return Game;

};