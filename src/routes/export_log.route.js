const express = require('express');
const router = express.Router();

const { exportLogController } = require('../controllers');
router.get('/adyen', exportLogController.getExportAdyen);
router.post('/adyen', exportLogController.postExportAdyen);

module.exports = router;
