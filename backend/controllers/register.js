const { sign } = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require("../configs/databaseConfig.js");


async function register(req, res) {
    const {name, email, phonenumber, password} = req.body;
    try {
        const client = await pool.connect();
        /* Kontrola zda je uživatel přítomen v databázi------------------------------------------------------------*/
        const data = await client.query('SELECT * FROM users WHERE email=$1;', [email]);
        const arr = data.rows;
        if (arr.length != 0) {
            return res.status(400).json({error: "Email je již zaregistrován, přihlašte se.",});
        }
        else {
            /* Hashovaní hesla uživatele----------------------------------------------------------------------------*/
            try {
                const hashedPassword = await bcrypt.hash(password, 10); // Wrap the code block inside a try-catch block
                const user = {name, email, phonenumber, password: hashedPassword,};
                var flag = 1;
                /* Uložení uživatele do databáze ------------------------------------------------------------------ */
                client.query('INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);', [user.name, user.email, user.phonenumber, user.password], (err) => {
                    if (err) {
                        flag = 0;
                        console.error(err);
                        return res.status(500).json({
                            error: "Database error"
                        })
                    }
                    else {
                        flag = 1;
                        res.status(200).send({ message: 'Uzivatel pridán do databáze' });
                    }
                })
                /* Podepisování webového tokenu JSON pro každého uživatele */
                if (flag) {
                    const token = sign({ email: user.email}, process.env.SECRET_KEY);
                    // Use the token value here
                    console.log(token); // Example of using the token value
                };
            } catch (err) {
                res.status(500).json({ error: "Chyba při hashování hesla!",});
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Chyba databáze při registraci uživatele!",});
    };
}

module.exports = register;

