require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (request, response) => {
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

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
