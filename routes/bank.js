const { Router } = require('express');
const router = Router();
const { getAccounts, postAccounts, postRemoveAccount, postUpdateAccount } = require('../controllers/bank_accounts');
const { getMovements, postMovements } = require('../controllers/bank_movements');

//rutas
router.get('/accounts', getAccounts);
router.post('/accounts', postAccounts);
router.post('/updateAccount', postUpdateAccount);
router.post('/removeAccount', postRemoveAccount);
router.get('/movements', getMovements);
router.post('/movements', postMovements);

module.exports = router;