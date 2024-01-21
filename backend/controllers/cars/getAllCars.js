const pool = require("../../configs/databaseConfig.js");

async function getAllCars(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cars');
        const cars = result.rows;
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chyba při získávání aut z databáze." });
    }
}

module.exports = getAllCars;
