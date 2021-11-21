const ordersController = require('../controllers').orders;
const orderItemsController = require('../controllers').orderItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Order API!',
  }));

  // order routes
  app.post('/api/orders', ordersController.create);
  app.get('/api/orders', ordersController.list);
  app.get('/api/orders/:orderId', ordersController.retrieve);
  app.put('/api/orders/:orderoId', ordersController.update);
  app.delete('/api/orders/:orderId', ordersController.destroy);

  // orderItem routes
  app.post('/api/orders/:orderId/items', orderItemsController.create);
  app.put('/api/orders/:orderId/items/:orderItemId', orderItemsController.update);
  app.delete(
    '/api/orders/:orderId/items/:orderItemId', orderItemsController.destroy
  );

  app.all('/api/orders/:orderId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
