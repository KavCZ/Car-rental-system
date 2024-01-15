// Import the http module to create an HTTP server and pool from dbConfig.js for database operations.
const http = require('http');
const pool = require('./configs/dbconfig.js');
const express = require("express");
const { json } = require("express");
const cors = require("cors");

const app = express();

app.use(json());
app.use(cors());

const port = 3000;

// Create an HTTP server that responds to all incoming requests with the text "Server online".
const server = http.createServer((_req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Server online\n');
    console.log("Server online...");
});

// Set the server to listen on the given port.
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
