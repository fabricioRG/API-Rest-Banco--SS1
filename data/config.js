const mysql = require('mysql2/promise');
const config = {
    host: 'localhost',
    user: 'root2',
    password: 'Password123#@!',
    database: 'BANK_SYSTEM',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

module.exports = pool;