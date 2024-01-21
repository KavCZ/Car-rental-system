const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const pool = require("../../configs/databaseConfig.js");

async function login(req, res) {
    /* Kontrola zda je uživatel registrován v databázi------------------------------------------------------------*/
    const { email, password } = req.body;
    try {
        const client = await pool.connect();
        const data = await client.query('SELECT * FROM users WHERE email= $1;', [email]);
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "Uživatel není přihlášen, přihlašte se",
            });
        }
        else {
            /* Porovnání hashovaného hesla s heslem uživatele-----------------------------------------------------*/
            try {
                const result = await compare(password, user[0].password);
                if (result === true) {
                    const token = sign({email: email}, process.env.SECRET_KEYE);
                    res.status(200).json({message: "Uživatel je přihlášen!", token: token});
                }
                else {
                    /* Řešení chyb při přihlašování uživatele-----------------------------------------------------*/
                    if (result != true) res.status(400).json({error: "Vložte správné heslo!"});
                }
            } catch (err) {
                res.status(500).json({
                    error: "Server error",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Chyba databáze při přihlašování!",
        });
    };
}

module.exports = login;
