const express = require('express');
const router = express.Router();
const db = require('../config/connectDB');

router.post('/', async (req, res) => {
	let u = req.body.username;
	let p = req.body.password;
	let sql = 'SELECT * FROM users WHERE username = ?';
	db.query(sql, [u], (err, rows) => {
		if (rows.length <= 0) {
			res.redirect('/login');
			return;
		}
		let user = rows[0];
		let pass_fromdb = user.password;
		const bcrypt = require('bcrypt');
		var kq = bcrypt.compareSync(p, pass_fromdb);
		if (kq) {
			console.log('Đăng nhập thành công!');
			const sess = req.session; //initialize session variable
			sess.daDangNhap = true;
			sess.username = user.username;
			// res.redirect('/home');
			if (sess.back) {
				console.log(sess.back);
				res.redirect(sess.back);
			} else {
				res.redirect('/home');
			}
		} else {
			console.log('Đăng nhập thất bại');
			res.redirect('/login');
		}
	});
});

router.get('/', (req, res) => {
	res.render('login', { title: 'Đăng nhập' });
});

module.exports = router;
