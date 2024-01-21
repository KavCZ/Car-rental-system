const { pool } = require("../../configs/databaseConfig.js");

async function getAllUsers(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        const users = result.rows;
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving users from the database." });
    }
}

module.exports = getAllUsers;

