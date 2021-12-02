const orderRouter = require('express').Router();
const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;
const axios = require('axios')

orderRouter.post('/', async (req, res) => {
  try {

    const orderItems = req.body.products || [] // list of orderItems
    console.log('Received order for', orderItems)
    if (orderItems.lenght === 0) {
      res.status(400).json({ error: 'An order must have at least one product' })
    }

    const itemsToVerify = orderItems.map(item => {
      return {
        id: item.id,
        amount: item.amount
      }
    })
    console.log('Starting verifying an order for products:')
    console.log(itemsToVerify)
    const INVENTORY_PATH = `${process.env.INVENTORY_URL}/api/v1/products/verify`
    console.log('Checking inventory', INVENTORY_PATH)
    const inventoryResponse = await axios.post(INVENTORY_PATH, itemsToVerify)

    const isStockTooLow = inventoryResponse.data.filter(item => item.status !== 'OK').length > 0
    console.log('Inventory response:', inventoryResponse.data)

    if (!isStockTooLow) {
      console.log('Creating an order')

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

      await OrderItem.bulkCreate(mappedItems) // Add products for order

      const response = {
        orderId: newOrder.id,
        status: "OK",
        products: inventoryResponse.data
      }
      console.log('Confirming order:', response)

      res.status(200).send(response)
    } else {
      res.status(400).send(inventoryResponse.data)
    }
  } catch (exception) {
    console.log(exception.message)

    res.status(400).json({ error: 'Malformatted json' })
  }

})

module.exports = orderRouter
