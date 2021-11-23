require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const orderRouter = require('./server/controllers/orders2')
app.use('/api2/orders', orderRouter);


const PORT = process.env.DEV_PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app;
