const { Router } = require('express');
const router = Router();
const { getAccounts, postAccounts } = require('../controllers/users_accounts');

//rutas
router.get('/accounts', getAccounts);
router.post('/accounts', postAccounts);

module.exports = router;