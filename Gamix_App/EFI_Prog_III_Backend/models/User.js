import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passWord: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    tableName: 'User',
    timestamps: false,
    hooks: {
      beforeCreate: async (user, options) => {
        
        const salt = await bcrypt.genSalt(10);
        
        user.passWord = await bcrypt.hash(user.passWord, salt);
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Purchase, {
      foreignKey: 'user_id',
    }),
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
    })
  };

  return User;
};
