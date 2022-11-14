const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
	res.render('index', { title: 'Trang chủ' });
});
router.get('/', (req, res) => {
	res.render('index', { title: 'Trang chủ' });
});

module.exports = router;
