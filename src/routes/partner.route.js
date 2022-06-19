const express = require('express');
const router = express.Router();

const { partnerController } = require('../controllers');
router.get('/', partnerController.index);
router.get('/create', partnerController.getCreate);
router.post('/create', partnerController.postCreate);
router.get('/edit/:id', partnerController.getEdit);
router.post('/edit/:id', partnerController.postEdit);
router.get('/remove/:id', partnerController.remove);

module.exports = router;
