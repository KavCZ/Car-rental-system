// Import the http module to create an HTTP server and pool from dbConfig.js for database operations.
import http from 'http';
import pool from './configs/dbconfig.js';

const port = 3000;

// Create an HTTP server that responds to all incoming requests with the text "Server online".
const server = http.createServer((_req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Server online\n');
});

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

// Set the server to listen on the given port.
server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
});