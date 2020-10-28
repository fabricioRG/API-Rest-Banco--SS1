const { Router } = require('express');
const router = Router();
const { getAccounts, postAccounts } = require('../controllers/bank_accounts');
const { getMovements, postMovements } = require('../controllers/bank_movements');

//rutas
router.get('/movements', getMovements);
router.post('/movements', postMovements);
router.get('/accounts', getAccounts);
router.post('/accounts', postAccounts);

module.exports = router;