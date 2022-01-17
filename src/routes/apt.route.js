const express = require('express');
const router = express.Router();

const { aptController, userController } = require('../controllers');

router.get('/callback-payment', aptController.callbackPayment);

module.exports = router;
