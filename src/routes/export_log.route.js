const express = require('express');
const router = express.Router();

const { exportLogController } = require('../controllers');
router.get('/adyen', exportLogController.getExportAdyen);
router.post('/adyen', exportLogController.postExportAdyen);
router.get('/payermax', exportLogController.getExportPayerMax);
router.post('/payermax', exportLogController.postExportPayerMax);
router.get('/unipin', exportLogController.getExportUnipin);
router.post('/unipin', exportLogController.postExportUnipin);
module.exports = router;
