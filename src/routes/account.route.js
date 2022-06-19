const express = require('express');
const router = express.Router();
const { checkAuthenAndAuthor } = require('../middleware/authentication');

const { accountController } = require('../controllers');

router.get('/login/create', accountController.getLoginCreate);
router.post('/login/create', accountController.postLoginCreate);
router.get('/login/password', accountController.getLoginPassword);
router.post('/login/password', accountController.postLoginPassword);
router.get('/login', accountController.getLoginUsername);
router.post('/login', accountController.postLoginUsername);
router.get('/logout', accountController.getLogout);
router.get('/init', accountController.getInit);
router.post('/init', accountController.postInit);

router.use(checkAuthenAndAuthor);
router.get('/change-password', accountController.getChangePassword);
router.post('/change-password', accountController.postChangePassword);

router.get('/managers/create', accountController.getCreateAccount);
router.post('/managers/create', accountController.postCreateAccount);
router.get('/managers/', accountController.getList);
router.get('/managers/block/:id', accountController.getBlockAccount);
router.get('/managers/un-block/:id', accountController.getUnBlockAccount);
router.get('/managers/:id', accountController.getById);
module.exports = router;
