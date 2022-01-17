const express = require('express');
const router = express.Router();
const { checkUsername } = require('../middleware/authentication');

const { accountController } = require('../controllers');

router.get('/login/create', accountController.getLoginCreate);
router.post('/login/create', accountController.postLoginCreate);
router.get('/login/password', accountController.getLoginPassword);
router.post('/login/password', accountController.postLoginPassword);
router.get('/login', accountController.getLoginUsername);
router.post('/login', accountController.postLoginUsername);
router.get('/logout', accountController.getLogout);
//router.get('/', accountController.list);
router.get('/create', accountController.getCreateAccount);
router.post('/create', accountController.postCreateAccount);
router.get('/', accountController.getList);
router.get('/block/:id', accountController.getBlockAccount);
router.get('/un-block/:id', accountController.getUnBlockAccount);
router.get('/:id', accountController.getById);
router.get('update/:id', accountController.getUpdate);
module.exports = router;
