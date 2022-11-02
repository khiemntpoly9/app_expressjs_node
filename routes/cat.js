const express = require('express');
const router = express.Router();

const catcontroller = require('../controllers/CatController');

router.get('/:cateId', catcontroller.index);
// router.get('/', shop.index);

module.exports = router;
