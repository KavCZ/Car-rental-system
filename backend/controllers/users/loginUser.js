const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { pool, secretKey } = require("../../configs/databaseConfig.js");

/* 
-- test data example --

{
  "email": "bedrichmaly@mail.cz",
  "password": "bedrichmaly"
}
*/

async function loginUser(req, res) {
    const { email, password } = req.body;

    let client;

    try {
        client = await pool.connect();

        // Check if the user is present in the database
        const data = await client.query('SELECT * FROM users WHERE email = $1;', [email]);
        const existingUser = data.rows[0];

        if (!existingUser) {
            console.log(`User with email ${email} not found.`);
            return res.status(400).json({ error: "User is not registered, please sign up" });
        }

        // Compare the hashed password with the user's password
        const result = await compare(password, existingUser.password_hash);

        if (result === true) {
            const token = sign({ email: email }, secretKey);
            console.log(`User ${email} successfully logged in.`);
            return res.status(200).json({ message: "User is logged in!", token: token });
        } else {
            console.log(`Incorrect password for user ${email}.`);
            return res.status(400).json({ error: "Enter the correct password!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error during user login!" });
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = loginUser;



