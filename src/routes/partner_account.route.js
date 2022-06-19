const express = require('express');
const router = express.Router();

const { partnerAccountController } = require('../controllers');
router.get('/', partnerAccountController.index);
router.get('/create', partnerAccountController.getCreate);
router.post('/create', partnerAccountController.postCreate);
router.get('/edit/:id', partnerAccountController.getEdit);
router.post('/edit/:id', partnerAccountController.postEdit);
router.get('/remove/:id', partnerAccountController.remove);

module.exports = router;
