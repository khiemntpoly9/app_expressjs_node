const express = require('express');
const router = express.Router();

const catcontroller = require('../controllers/cat.controller');

router.get('/:cateId', catcontroller.index);
// router.get('/', shop.index);

module.exports = router;
