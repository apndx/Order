require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const orderRouter = require('./server/controllers/orders')
app.use('/api/orders', orderRouter);

const PORT = process.env.DEV_PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)

})

module.exports = app;
