const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('dev', { title: 'Dev' });
});

module.exports = router;
