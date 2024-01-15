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
});

pool.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Načítání databáze ... ");
    }
});
/*
const checkDatabaseConnection = () => {
    pool.query('SELECT NOW()', (error, results) => {
        if (error) {
            console.error('Chyba při připojení k databázi:', error);
        } else {
            console.log('Úspěšně připojeno k databázi. Aktuální čas z databáze je:', results.rows[0].now);
        }
    });
};

// Volání funkce pro ověření připojení
checkDatabaseConnection();

// Execute an SQL query that retrieves all rows from the 'users' table.
pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows);
});

// Execute an SQL query that retrieves all rows from the 'cars' table.
pool.query('SELECT * FROM cars', (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows);
});

// Execute an SQL query that retrieves all rows from the 'event' table.
pool.query('SELECT * FROM event', (error, results) => {
    if (error) {
        throw error;
    }
    console.log(results.rows);
});
*/
// Set the server to listen on the given port.
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
