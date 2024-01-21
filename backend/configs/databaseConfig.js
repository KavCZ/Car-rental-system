const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "car_rental_db",
  password: "postgres",
  port: 5432,
  minPoolSize: 5,
  maxPoolSize: 10,
  connectTimeout: 10000,
});

module.exports = pool;