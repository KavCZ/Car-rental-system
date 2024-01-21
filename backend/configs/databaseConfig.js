const { Pool } = require("pg");

const secretKey = "hakunamatata";

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

(async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT current_timestamp AS current_time');
    console.log("Start funkční konfigurace: " + result.rows[0].current_time);
  } finally {
    client.release();
  }
})();

module.exports = {
  pool,
  secretKey,
};