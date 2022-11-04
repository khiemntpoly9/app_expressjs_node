const db = require('../config/connectDB');

const Book = (book) => {
	this.id = cat.id;
	this.tenLoai = cat.tenLoai;
	this.thuTu = cat.thuTu;
	this.anHien = cat.anHien;
};

Book.get_category = (result) => {
	let sql = 'SELECT id, tenLoai from loai';
	db.query(sql, (err, book) => {
		if (!err) {
			result(book);
		} else {
			console.log(err);
		}
	});
};

module.exports = Book;
