const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool, secretKey } = require("../../configs/databaseConfig.js");

/* 
-- test data example --

{
  "first_name": "Bedřich",
  "last_name": "Malý",
  "birthday": "07.11.1985",
  "email": "bedrichmaly@mail.cz",
  "phone_number": 704888999,
  "password": "bedrichmaly"
}
*/

async function registerUser(req, res) {
    const { first_name, last_name, birthday, email, phone_number, password } = req.body;

    let client;

    try {
        client = await pool.connect();

        // Check if the user is present in the database
        const data = await client.query('SELECT * FROM users WHERE email=$1;', [email]);
        const existingUser = data.rows[0];

        if (existingUser) {
            console.log(`User with email ${email} already exists.`);
            return res.status(400).json({ error: "Email is already registered, please log in." });
        }

        // Hashing the user's password
        const password_hash = await bcrypt.hash(password, 10);

        // Retrieving the highest value of user_id from the database
        const maxUserIdQuery = await client.query('SELECT MAX(user_id) FROM users');
        const maxUserId = maxUserIdQuery.rows[0].max || 0;

        // Assigning a new user_id for the new user
        const newUser_id = maxUserId + 1;

        // Saving the user to the database
        await client.query('INSERT INTO users (user_id, first_name, last_name, birthday, email, phone_number, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [newUser_id, first_name, last_name, birthday, email, phone_number, password_hash]);

        // Signing a JSON web token for the user
        const token = sign({ email: email }, secretKey);

        res.status(200).send({ message: 'User added to the database', token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error during user registration!" });
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = registerUser;




