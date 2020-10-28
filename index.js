const express = require("express");
const bodyParser = require('body-parser');

//npm run dev
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load the MySQL pool connection
const pool = require('./data/config');

// Display a single user by ID
app.get('/users/accounts/:id', (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM USER_ACCOUNT WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

// Display all users
app.get('/users/accounts', (request, response) => {

    var userName = request.query.userName;

    if (userName) {
        pool.query('SELECT * FROM USER_ACCOUNT WHERE userName = ?', userName, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    } else {
        pool.query('SELECT * FROM USER_ACCOUNT', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    }

});

// Add a new user
app.post('/users/accounts', (request, response) => {
    pool.query('SELECT AUTO_CREATE_USER_ACCOUNT(?,?,?) as id', [request.body.name, request.body.userName, request.body.pin], (error, result) => {
        if (error) throw error;
        response.status(201).json(result);
    });
});

app.get('/bank/accounts', (request, response) => {
    const idBankAccount = request.query.id;

    if (idBankAccount) {
        pool.query('SELECT * FROM BANK_ACCOUNT WHERE id = ?', idBankAccount, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    } else {
        pool.query('SELECT * FROM BANK_ACCOUNT', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    }
});

app.post('/bank/accounts', (request, response) => {

    if (request.body.idUserAccount && request.body.accountType && request.body.role) {
        pool.query('SELECT DEFAULT_CREATE_BANK_ACCOUNT(?,?,?) as id', [request.body.idUserAccount, request.body.accountType, request.body.role], (error, result) => {
            if (error) throw error;

            response.status(201).json(result);
        });
    } else if (request.body.id) {
        pool.query('SELECT stateAccount as i1 FROM BANK_ACCOUNT WHERE id = ?', [request.body.id], (error, result) => {
            if (error) throw error;

            response.status(201).json(result);
        });
    }

});

// Display a single user by ID
app.get('/bank/movements/:id', (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM BANK_MOVEMENT WHERE id = ?', id, (error, result) => {
        if (error) throw error;

        response.send(result);
    });
});

app.get('/bank/movements', (request, response) => {

    let idBankAccount = request.query.idBankAccount;
    let movementType = request.query.movementType;

    if (idBankAccount && movementType) {
        pool.query('SELECT * FROM BANK_MOVEMENT WHERE idBankAccount = ? AND movementType = ?', [idBankAccount, movementType], (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    } else if (idBankAccount) {
        pool.query('SELECT * FROM BANK_MOVEMENT WHERE idBankAccount = ?', idBankAccount, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    } else if (movementType) {
        pool.query('SELECT * FROM BANK_MOVEMENT WHERE movementType = ?', movementType, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    } else {
        pool.query('SELECT * FROM BANK_MOVEMENT', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    }
});

app.post('/bank/movements', (request, response) => {

    pool.query('SELECT ADD_BANK_MOVEMENT(?,?,?) as i1', [request.body.idBankAccount, request.body.movementType, request.body.amount], (error, result) => {
        if (error) throw error;
        response.status(201).json(result);
    });

});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});