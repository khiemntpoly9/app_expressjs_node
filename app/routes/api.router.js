const express = require('express');
const router = express.Router();

const apiController = require('../controllers/api.controller');

router.get('/category/:cateId', apiController.category_id);
router.get('/category', apiController.category);
router.get('/book', apiController.getAllBook);

module.exports = router;
