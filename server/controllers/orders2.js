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
    console.log('Starting verifying an order for products:', itemsToVerify)
    const INVENTORY_VERIFY_PATH = `${process.env.INVENTORY_URL}/api/v1/products/verify`
    const inventoryResponse = await axios.post(INVENTORY_VERIFY_PATH, itemsToVerify)
    console.log('Inventory response:', inventoryResponse.data)

    const isStockTooLow = inventoryResponse.data.filter(item => item.status !== 'OK').length > 0
    if (!isStockTooLow) {
      console.log('Inventory ok, reducing oredered products')
      const INVENTORY_ORDER_PATH = `${process.env.INVENTORY_URL}/api/v1/products/order`
      const inventoryReductionResponse = await axios.post(INVENTORY_ORDER_PATH, itemsToVerify)
      console.log('Inventory response:',inventoryReductionResponse.data)
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
      console.log('Not enough stock, please adjust the order')
      const response = {
        status: "NOT_OK",
        products: inventoryResponse.data
      }
      res.status(400).send(response)
    }
  } catch (exception) {
    console.log(exception.message)

    res.status(400).json({ error: 'Malformatted json' })
  }

})

module.exports = orderRouter
