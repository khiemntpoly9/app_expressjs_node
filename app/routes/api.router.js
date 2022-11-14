const express = require('express');
const router = express.Router();
const path = require('path');
const Book = require('../models/api.model');
const multer = require('multer');

// Option Multer
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../../public/images'));
	},
	filename: function (req, file, cb) {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const second = date.getSeconds();
		const uniqueSuffix = `${day}${month}${year}-${hours}${minutes}${second}`;
		cb(null, uniqueSuffix + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

// Admin
router.post('/addbook', upload.single('urlHinh'), (req, res) => {
	const data = req.body;
	const urlHinhi = req.file.filename;
	Book.add_book(data, urlHinhi, (response) => {
		res.send({ result: data });
	});
});

// Admin xoá
router.delete('/delete/:idBook', (req, res) => {
	const idBook = req.params.idBook;
	Book.delete_book(idBook);
});

// Admin cập nhật sản phẩm
router.put('/book/:idBook', upload.single('urlHinh'), (req, res) => {
	const bookId = req.params.idBook;
	const data = req.body;
	const urlHinhi = req.file.filename;
	Book.update_book(bookId, data, urlHinhi, (data) => {
		res.send({ result: data });
	});
});

// Client
router.get('/category/:cateId', (req, res) => {
	const cateId = req.params.cateId;
	Book.get_category_id(cateId, (data) => {
		res.send({ result: data });
	});
});

router.get('/category', (req, res) => {
	Book.get_category((data) => {
		res.send({ result: data });
	});
});

// Lấy thông tin sản phẩm
router.get('/book/:idBook', (req, res) => {
	const bookId = req.params.idBook;
	Book.get_book_id(bookId, (data) => {
		res.send({ result: data });
	});
});

// Lấy tất cả sản phẩm
router.get('/book', (req, res) => {
	Book.get_all_book((data) => {
		res.send({ result: data });
	});
});

module.exports = router;
