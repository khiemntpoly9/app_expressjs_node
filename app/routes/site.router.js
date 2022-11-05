const express = require('express');
const router = express.Router();

// Gọi Controller Site
// const siteController = require('../controllers/site.controller');

router.get('/home', (req, res) => {
	res.render('index', { title: 'Trang chủ' });
});
router.get('/', (req, res) => {
	res.render('index', { title: 'Trang chủ' });
});

module.exports = router;
