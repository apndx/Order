require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the Order API!',
}));

const PORT = process.env.DEV_PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app;
