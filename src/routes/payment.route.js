const express = require('express');
const router = express.Router();

const { paymentController } = require('../controllers');

router.get('/', paymentController.getlist);
router.get('/notification', paymentController.createNotificationAll);
router.get('/notification/:id', paymentController.createNotification);

module.exports = router;
