const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { pool, secretKey } = require("../../configs/databaseConfig.js");

async function login(req, res) {
    const { email, password } = req.body;

    let client;

    try {
        client = await pool.connect();

        // Kontrola, zda je uživatel přítomen v databázi
        const data = await client.query('SELECT * FROM users WHERE email = $1;', [email]);
        const existingUser = data.rows[0];

        if (!existingUser) {
            console.log(`Uživatel s emailem ${email} nenalezen.`);
            return res.status(400).json({ error: "Uživatel není registrován, zaregistrujte se" });
        }

        // Porovnání hashovaného hesla s heslem uživatele
        const result = await compare(password, existingUser.password_hash);

        if (result === true) {
            const token = sign({ email: email }, secretKey);
            console.log(`Uživatel ${email} úspěšně přihlášen.`);
            return res.status(200).json({ message: "Uživatel je přihlášen!", token: token });
        } else {
            console.log(`Špatné heslo pro uživatele ${email}.`);
            return res.status(400).json({ error: "Vložte správné heslo!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Chyba při přihlašování uživatele!" });
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = login;


