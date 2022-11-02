const mysql = require('mysql');

let db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'labnodejs',
});

exports.index = (req, res) => {
	let id = req.params.cateId;
	let sql = 'SELECT * from loai';
	let sqlSach = `SELECT * from sach WHERE idLoai=${id}`;
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
