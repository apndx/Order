module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {});

  Order.associate = (models) => {
    Order.hasMany(models.OrderItem, {
      foreignKey: 'order_id',
      as: 'orderItems',
    });
  };

  return Order;
};
