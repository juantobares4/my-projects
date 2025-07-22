import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    tableName: 'Purchase',
    timestamps: false
  });

  Purchase.associate = function (models) {
    Purchase.hasMany(models.PurchaseDetail, {
      foreignKey: 'purchase_id'
    }),
      Purchase.belongsTo(models.User, {
        foreignKey: 'user_id',
      })
  };

  return Purchase;
};
