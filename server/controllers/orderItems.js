const OrderItem = require('../models').OrderItem;

module.exports = {
  create(req, res) {
    return OrderItem
      .create({
        order_id: req.params.orderId,
        product_id: req.body.productId,
        name: req.body.name,
        price: req.body.price,
        amount: req.body.amount
      })
      .then(orderItem => res.status(201).send(orderItem))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return OrderItem
      .find({
        where: {
          order_item_id: req.params.orderItemId,
          order_id: req.params.orderId,
        },
      })
      .then(orderItem => {
        if (!orderItem) {
          return res.status(404).send({
            message: 'OrderItem Not Found',
          });
        }

        return orderItem
          .update({
            name: req.params.name || orderItem.name,
            price: req.params.price || orderItem.price,
            amount: req.params.amount || orderItem.amount,
          })
          .then(updatedOrderItem => res.status(200).send(updatedOrderItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return OrderItem
      .find({
        where: {
          order_item_id: req.params.orderItemId,
          order_id: req.params.orderId,
        },
      })
      .then(orderItem => {
        if (!orderItem) {
          return res.status(404).send({
            message: 'OrderItem Not Found',
          });
        }

        return orderItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};
