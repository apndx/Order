const Pool = require('pg').Pool
const pool = new Pool({
  user:  process.env.POSTGRES_USER,
  host: 'localhost',
  database: 'order_db',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})


module.exports = {
  pool
}
