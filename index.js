require('dotenv').config()
const express = require('express')
const app = express()
const { pool } = require('./queries')

app.use(express.json())

app.get('/', (request, result) => {
  response.send('<h1>Welcome to order service!</h1>')
})

app.post('/order', (request, response) => {
  try {
    response.json('Order received')

  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong...' })

  }
})

app.post('/products/:id', (request, response) => {
  try {
    const product_id = parseInt(request.params.id)

      pool.query('INSERT INTO products (product_id) VALUES ($1)', [product_id], (error, result) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Product added with ID: ${product_id}`)
      })
    
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'Something went wrong...' })
  }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
