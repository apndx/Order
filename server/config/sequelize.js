if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  production: {
    dialect: 'postgresql',
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 300000000
    }
  },

  composed: {
    port: process.env.DEV_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'orderdb',
    host: "192.168.1.3",
    port: 5432,
    dialect: 'postgresql',
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 300000000
    }
  },
  development: {
    port: process.env.DEV_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'order_db',
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgresql',
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 300000000
    }
  },
  test: {
    port: process.env.TEST_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'order_db',
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgresql',
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 300000000
    }
  }
}
