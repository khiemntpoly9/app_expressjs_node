const db = require('../config/connectDB');

// Category
const cat = (result) => {
	let sql = 'SELECT id, tenLoai from loai';
	db.query(sql, (err, item) => {
		if (!err) {
			result(item);
		} else {
			console.log(err);
		}
	});
};

const listBookId = (id) => {
	let sql = `SELECT * from sach WHERE idLoai=${id}`;
	db.query(sql, (err, item) => {
		if (!err) {
			console.log(item);
			result(item);
		} else {
			console.log(err);
		}
	});
};

module.exports = { cat, listBookId };
