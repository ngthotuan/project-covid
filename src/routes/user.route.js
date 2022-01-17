const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');

router.get('/categories', userController.getList);
router.get('/categories/:id', userController.detail);
// router.get('/', userController.index);
router.get('/details', userController.getProfile);
router.get('/manager-history', userController.getUserHistories);
router.get('/payment-history', userController.getTransactionHistory);
router.get('/category-history', userController.getBuyHistory);
router.get('/change-password', userController.getChangePassword);
router.post('/change-password', userController.postChangePassword);

module.exports = router;
