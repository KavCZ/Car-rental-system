const { Pool } = require('pg')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path:'../../.env'});
};

let dbPassword = process.env.DB_PASSWORD

dbPassword = String(dbPassword);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  password: dbPassword,
  port: process.env.DB_PORT,
  minPoolSize: 5,
  maxPoolSize: 10,
  connectTimeout: 10000,
});

module.exports = pool;