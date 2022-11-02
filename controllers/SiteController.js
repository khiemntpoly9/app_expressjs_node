const mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'labnodejs',
});

exports.index = (req, res) => {
	let sql = 'SELECT id, tenLoai from loai';
	let sqlSach = 'SELECT id, tenSach, moTa, urlHinh, gia from sach';
	db.query(sql, (err, item) => {
		if (!err) {
			db.query(sqlSach, (err, listSach) => {
				if (!err) {
					res.render('home', { title: 'Trang chủ', items: item, listSach: listSach });
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
		// console.log('The data from tables: \n', rows);
	});
};
