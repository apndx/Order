const orderRouter = require('express').Router();
const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;
const axios = require('axios')

orderRouter.post('/', async (req, res) => {
  try {
    const orderItems = req.body // list of orderItems
    console.log(req.body)

    //const INVENTORY_PATH = `${process.env.INVENTORY_URL}/api/v1/products/verify`
    //const inventoryStatus = await axios.post(INVENTORY_PATH, orderItems)

    //console.log(inventoryStatus)
    //if (inventoryStatus.status === 'OK') {
      const newOrder =  await Order.create({}) // Create order

      const mappedItems = orderItems.map(item => {
        return {
          order_id: newOrder.id,
          product_id: item.id,
          name: item.name,
          price: item.price,
          amount: item.amount
        }
      })

      const newItems = await OrderItem.bulkCreate(mappedItems) // Add products for order

      res.status(200).send(newItems) //TODO: add orderId and overall status to the response
    //} else {
    //  res.status(400).send(inventoryStatus)
    //}
  } catch (exception) {
    console.log(exception.message)
    res.status(400).json({ error: 'malformatted json' })
  }

})

module.exports = orderRouter
