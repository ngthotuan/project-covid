const express = require('express');
const router = express.Router();

const { productController } = require('../controllers');
router.get('/', productController.index);
router.get('/create', productController.getCreate);
router.post('/create', productController.postCreate);
router.get('/edit/:id', productController.getEdit);
router.post('/edit/:id', productController.postEdit);
router.get('/remove/:id', productController.remove);

module.exports = router;
