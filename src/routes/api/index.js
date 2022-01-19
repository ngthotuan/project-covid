const express = require('express');
const router = express.Router();

router.use('/districts', require('./district.api.route'));
router.use('/provinces', require('./province.api.route'));
router.use('/patients', require('./patient.api.route'));

module.exports = router;
