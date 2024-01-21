const { pool } = require("../../configs/databaseConfig.js");

async function getUserById(req, res) {
    const user_id = req.params.user_id;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [user_id]);

        if (result.rows.length === 0) {
            res.status(404).json({ error: "Uživatel nenalezen" });
        } else {
            const user = result.rows[0];
            res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chyba při získávání uživatele z databáze." });
    }
}

module.exports = getUserById;
