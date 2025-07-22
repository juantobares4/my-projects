'use strict';
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Review = sequelize.define(
    'Review',
    {
      game_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Game',
          key: 'id',
        },
      }, 
      user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      rating:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment:{
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      tableName: 'Review',
      timestamps: false
    })
  
    Review.associate = function (models) {
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
      }),
      Review.belongsTo(models.Game, {
        foreignKey: 'game_id',
      })
    };

  return Review;
};