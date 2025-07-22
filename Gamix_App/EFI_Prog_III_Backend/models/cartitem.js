'use strict';
import { DataTypes } from "sequelize";
export default (sequelize) => {
  const CartItem = sequelize.define('CartItem', {
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cart',
        key: 'id',
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Game',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: 'CartItem',
    timestamps: false
  });

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart, {
      foreignKey: 'cart_id',
    });
    CartItem.belongsTo(models.Game, {
      foreignKey: 'game_id',
    });
  };

  return CartItem;
};