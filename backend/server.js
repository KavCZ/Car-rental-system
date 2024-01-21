const express = require("express");
const { pool } = require("./configs/databaseConfig.js");
const cors = require("cors");
const users = require('./routes/users.js');
const cars = require('./routes/cars.js');
const events = require('./routes/events.js');
const app = express();
const port = 8000;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/cars", cars);
app.use("/events", events);

app.get("/", (_req, res) => {
    res.status(200).send("Server online ...")
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

pool.connect((err) => {
    if (err) {
        console.log("Chyba připojení k databázi ..." + err);
    }
    else {
        console.log("Databáze online ... ");
    }
});

module.exports = app;