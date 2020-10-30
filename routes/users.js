const { Router } = require('express');
const router = Router();
const { getAccounts, postAccounts, postUpdateAccount } = require('../controllers/users_accounts');

//rutas
router.get('/accounts', getAccounts);
router.post('/accounts', postAccounts);
router.post('/updateAccount', postUpdateAccount)

module.exports = router;