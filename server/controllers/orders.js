const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;

module.exports = {
  create(req, res) {
    return Order
      .create({})
      .then((order) => res.status(201).send(order))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Order
      .findAll({
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: OrderItem, as: 'orderItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((orders) => res.status(200).send(orders))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Order
      .findById(req.params.orderId, {
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
      })
      .then((order) => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return res.status(200).send(order);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Order
      .findById(req.params.orderId, {
        include: [{
          model: OrderItem,
          as: 'orderItems',
        }],
      })
      .then(order => {
        if (!order) {
          return res.status(404).send({
            message: 'Order Not Found',
          });
        }
        return order
          .update({})
          .then(() => res.status(200).send(order))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Order
      .findById(req.params.orderId)
      .then(order => {
        if (!order) {
          return res.status(400).send({
            message: 'Order Not Found',
          });
        }
        return order
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
