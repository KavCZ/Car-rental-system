const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { pool, secretKey } = require("../../configs/databaseConfig.js");

async function register(req, res) {
    const { first_name, last_name, birthday, email, phone_number, password } = req.body;
    console.log("request.body");

    let client; // Definujte proměnnou client mimo blok try, aby byla dostupná v finally

    try {
        client = await pool.connect();
        console.log("client");

        // Kontrola, zda je uživatel přítomen v databázi
        const data = await client.query('SELECT * FROM users WHERE email=$1;', [email]);
        const existingUser = data.rows[0];
        console.log("user exist");

        if (existingUser) {
            console.log(`Uživatel s emailem ${email} již existuje.`);
            return res.status(400).json({ error: "Email je již zaregistrován, přihlašte se." });
        }

        // Hashování hesla uživatele
        const password_hash = await bcrypt.hash(password, 10);
        console.log("hashovani" + password_hash);

        // Získání nejvyšší hodnoty user_id z databáze
        const maxUserIdQuery = await client.query('SELECT MAX(user_id) FROM users');
        const maxUserId = maxUserIdQuery.rows[0].max || 0; // Pokud není žádný uživatel v databázi, použijeme 0
        console.log("maxuserid" + maxUserId)

        // Přidělení nového user_id pro nového uživatele
        const newUser_id = maxUserId + 1;

        // Uložení uživatele do databáze
        await client.query('INSERT INTO users (user_id, first_name, last_name, birthday, email, phone_number, password_hash) VALUES ($1, $2, $3, $4, $5, $6, $7);',
            [newUser_id, first_name, last_name, birthday, email, phone_number, password_hash]);

        console.log(`Uživatel ${email} byl úspěšně zaregistrován.`);

        // Zpětný výpis všech uživatelů
        const allUsers = await client.query('SELECT * FROM users');
        console.log('Všichni uživatelé:', allUsers.rows);

        // Podepisování webového tokenu JSON pro každého uživatele
        const token = sign({ email: email }, secretKey);
        console.log('Vytvořený token:', token);

        res.status(200).send({ message: 'Uživatel přidán do databáze' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Chyba při registraci uživatele!" });
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = register;



