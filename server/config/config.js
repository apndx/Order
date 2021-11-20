const { production, development, test } = require('../config/sequelize')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let sequelizeConfig = null
let port = null

if (process.env.NODE_ENV === 'production') {
  sequelizeConfig = production
  port = process.env.PORT
}

if (process.env.NODE_ENV === 'test') {
  sequelizeConfig = test
  port = process.env.TEST_PORT
}

if (process.env.NODE_ENV === 'development') {
  sequelizeConfig = development
  port = process.env.DEV_PORT
}

module.exports = {
  sequelizeConfig,
  port
}
