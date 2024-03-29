const { pool } = require("../../configs/databaseConfig.js");

async function getAllEvents(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM events');
        const events = result.rows;
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving reserved events from the database." });
    }
}

module.exports = getAllEvents;
