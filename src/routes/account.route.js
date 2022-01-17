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
router.get('/init', accountController.getInit);
router.post('/init', accountController.postInit);
//router.get('/', accountController.list);
module.exports = router;
