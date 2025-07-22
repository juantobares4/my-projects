'use strict';
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Cart = sequelize.define('Cart', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  },{
    tableName: 'Cart',
    timestamps: false
  })
  
  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cart_id'
    });
  };

  return Cart;
};