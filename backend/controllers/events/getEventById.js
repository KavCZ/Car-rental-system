const { pool } = require("../../configs/databaseConfig");

async function getEventById(req, res) {
    const event_id = req.params.event_id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM events WHERE event_id = $1',[event_id]);

        if (result.rows.length === 0 ) {
            res.status(404).json({ error: "Registered event not found"});
        } else {
            const event = result.rows[0];
            res.status(200).json(event);
        }
    } catch {
        console.log(error);
        res.status(500).json({ error: "Error retrieving registered events from the database."});
    }
}

module.exports = getEventById;
