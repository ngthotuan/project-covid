const express = require('express');
const router = express.Router();

const { managerController } = require('../controllers');

router.get('/create', managerController.getCreateAccount);
router.post('/create', managerController.postCreateAccount);
router.get('/', managerController.getList);
router.get('/block/:id', managerController.getBlockAccount);
router.get('/un-block/:id', managerController.getUnBlockAccount);
router.get('/:id', managerController.getById);
router.get('update/:id', managerController.getUpdate);
module.exports = router;
