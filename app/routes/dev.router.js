const express = require('express');
const router = express.Router();

// Gọi Controller Site
const devTest = require('../controllers/dev.controller');

router.get('/', devTest.index);

module.exports = router;
