const express = require('express');
const router = express.Router();

const { productMappingController } = require('../controllers');
router.get('/', productMappingController.index);
router.get('/create', productMappingController.getCreate);
router.post('/create', productMappingController.postCreate);
router.get('/edit/:id', productMappingController.getEdit);
router.post('/edit/:id', productMappingController.postEdit);
router.get('/remove/:id', productMappingController.remove);

module.exports = router;
