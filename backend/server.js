const { json } = require("express");
const http = require('http');
const pool = require("./configs/databaseConfig.js");
const express = require("express");
const cors = require("cors");
const user = require('./routes/users.js');

const app = express();

app.use(json());

app.use(cors());

app.use("/user", user);

const port = process.env.PORT || 5432



;

app.get("/", (_req, res) => {
    res.status(200).send("Server online ...")
});

pool.connect((err) => {
    if (err) {
        console.log("Chyba připojení k databázi ..." + err);
    }
    else {
        console.log("Databáze online ... ");
    }
});

const server = http.createServer((_req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server online\n');
    console.log("Server online...");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
module.exports = server;
