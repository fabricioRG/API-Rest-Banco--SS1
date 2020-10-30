const pool = require('../data/config');

//OBTENER TODOS LOS DEPOSITOS
const getAccounts = async(req, res) => {

    let idBankAccount = req.query.id;

    if (idBankAccount) {
        const response = await pool.query('SELECT * FROM BANK_ACCOUNT WHERE id = ?', idBankAccount);

        if (response[0].length < 1) {
            const error = JSON.parse('{"id" : 0 }');
            res.status(200).json(error);
        } else {
            res.status(200).json(response[0][0]);
        }

    } else {

        const response = await pool.query('SELECT * FROM BANK_ACCOUNT');
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"count" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            res.status(200).json(response[0]);
        }

    }
}

const postAccounts = async(req, res) => {
    let idUserAccount = req.body.idUserAccount;
    let accountType = req.body.accountType;
    let role = req.body.role
    let id = req.body.id;

    if (idUserAccount && accountType && role) {
        const response = await pool.query('SELECT DEFAULT_CREATE_BANK_ACCOUNT(?,?,?) as id', [idUserAccount, accountType, role]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"id" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            res.status(200).json(response[0]);
        }
    } else if (id) {
        const response = await pool.query('SELECT stateAccount as i1 FROM BANK_ACCOUNT WHERE id = ?', [id]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"id" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            res.status(200).json(response[0][0]);
        }
    } else {
        const emptyAns = JSON.parse('{"e" : 1 }');
        res.status(200).json(emptyAns);
    }
}

//UPDATED
const postRemoveAccount = async(req, res) => {
    let id = req.body.id;

    if (id) {
        const response = await pool.query('UPDATE BANK_ACCOUNT SET stateAccount = \'INACTIVE\' WHERE id = ? ', [id]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"result" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            const ans = JSON.parse('{"result" : ' + response[0].affectedRows + '}')
                // console.log(response[0].affectedRows)
            res.status(200).json(ans);
        }
    } else {
        const emptyAns = JSON.parse('{"result" : 0 }');
        res.status(200).json(emptyAns);
    }
}

const postUpdateAccount = async(req, res) => {
    let id = req.body.id;
    let accountType = req.body.accountType;

    if (id && accountType) {
        const response = await pool.query('SELECT UPDATE_BANK_ACCOUNT_TYPE(?,?) as result', [id, accountType]);
        if (response[0].length < 1) {
            const emptyAns = JSON.parse('{"result" : 0 }');
            res.status(200).json(emptyAns);
        } else {
            // const ans = JSON.parse('{"result" : ' + response[0][0] + '}')
            // console.log(response[0].affectedRows)
            res.status(200).json(response[0]);
        }
    } else {
        const emptyAns = JSON.parse('{"result" : 0 }');
        res.status(200).json(emptyAns);
    }
}

module.exports = {
    getAccounts,
    postAccounts,
    postRemoveAccount,
    postUpdateAccount,
}