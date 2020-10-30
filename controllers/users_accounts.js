const { response } = require('express');
const pool = require('../data/config');

//OBTENER TODOS LOS DEPOSITOS
const getAccounts = async(req, res) => {

    let userName = req.query.userName;
    let userId = req.query.id;

    if (userId) {
        const response = await pool.query('SELECT * FROM USER_ACCOUNT WHERE id = ?', userId);

        if (response[0].length < 1) {
            const error = JSON.parse('{"id" : 0 }');
            res.status(200).json(error);
        } else {
            // console.log(response);
            res.status(200).json(response[0][0]);
        }
    } else if (userName) {
        const response = await pool.query('SELECT * FROM USER_ACCOUNT WHERE userName = ?', userName);

        if (response[0].length < 1) {
            const error = JSON.parse('{"id" : 0 }');
            res.status(200).json(error);
        } else {
            res.status(200).json(response[0][0]);
        }
    } else {
        const response = await pool.query('SELECT * FROM USER_ACCOUNT;');
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"count" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            res.status(200).json(response[0]);
        }
    }
}

const postAccounts = async(req, res) => {

    let name = req.body.name;
    let userName = req.body.userName;
    let pin = req.body.pin;

    if (name && userName && pin) {
        const response = await pool.query('SELECT AUTO_CREATE_USER_ACCOUNT(?,?,?) as id', [name, userName, pin]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"id" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            res.status(200).json(response[0]);
        }
    }

}

const postUpdateAccount = async(req, res) => {

    let id = req.body.id;
    let name = req.body.name;

    if (id && name) {
        const response = await pool.query('UPDATE USER_ACCOUNT SET name = ? WHERE id = ? ', [name, id]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"result" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            const ans = JSON.parse('{"result" : ' + response[0].affectedRows + '}')
            res.status(200).json(ans);
        }
    } else {
        const emptyAns = JSON.parse('{"result" : 0 }');
        res.status(200).json(emptyAns);
    }

}

module.exports = {
    getAccounts,
    postAccounts,
    postUpdateAccount,
}