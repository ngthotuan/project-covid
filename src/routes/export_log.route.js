const express = require('express');
const router = express.Router();

const { exportLogController } = require('../controllers');
router.get('/adyen', exportLogController.adyen.get);
router.post('/adyen', exportLogController.adyen.post);
router.get('/payermax', exportLogController.payermax.get);
router.post('/payermax', exportLogController.payermax.post);
router.get('/unipin', exportLogController.unipin.get);
router.post('/unipin', exportLogController.unipin.post);
router.get('/gudang', exportLogController.gudang.get);
router.post('/gudang', exportLogController.gudang.post);
router.get('/gash', exportLogController.gash.get);
router.post('/gash', exportLogController.gash.post);
router.get('/mycard', exportLogController.mycard.get);
router.post('/mycard', exportLogController.mycard.post);
module.exports = router;
