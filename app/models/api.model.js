const db = require('../config/connectDB');

const Book = (book) => {
	this.id = cat.id;
	this.tenLoai = cat.tenLoai;
	this.thuTu = cat.thuTu;
	this.anHien = cat.anHien;
};

Book.get_category = (result) => {
	let sql = 'SELECT id, tenLoai from loai';
	db.query(sql, (err, book_cat) => {
		if (!err) {
			result(book_cat);
		} else {
			console.log(err);
		}
	});
};

Book.get_all_book = (result) => {
	let sql = `SELECT * FROM sach`;
	db.query(sql, (err, book) => {
		if (!err) {
			result(book);
		} else {
			console.log(err);
		}
	});
};

Book.get_category_id = (cateId, result) => {
	let sql = `SELECT * FROM sach WHERE idLoai=${cateId}`;
	db.query(sql, (err, book) => {
		if (!err) {
			result(book);
		} else {
			console.log(err);
		}
	});
};

module.exports = Book;
