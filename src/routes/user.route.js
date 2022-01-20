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
router.get('/payment-debt', userController.paymentDebt);
router.get('/payment', userController.getPayment);
router.post('/payment', userController.payment);
router.get('/cart', userController.getProductInCart);
router.post('/cart', userController.postProductInCart);
router.get('/add-to-cart/:id', userController.addToCart);
router.get('/delete-cart-item/:id', userController.deleteCartItem);
router.get('/orders/detail/:id', userController.getOrderDetail);
router.get('/notification/:patientId', userController.getAllNotification);

module.exports = router;
