const express = require('express');
const router = express.Router();

const { patientApiController } = require('../../controllers');

router.get('/get-credit-remain', patientApiController.getCreditRemain);

module.exports = router;
