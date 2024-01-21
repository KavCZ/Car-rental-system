const { pool } = require("../../configs/databaseConfig.js");

async function getCarById(req, res) {
    const car_id = req.params.car_id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM cars WHERE car_id = $1', [car_id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Vozidlo nenalezeno" });
        } else {
            const car = result.rows[0];
            res.status(200).json(car);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chyba při získávání vozidla z databáze." });
    }
}

module.exports = getCarById;
