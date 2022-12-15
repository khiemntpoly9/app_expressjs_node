const db = require('../config/connectDB');

const express = require('express');
const router = express.Router();
const path = require('path');
// Bcrypt
const bcrypt = require('bcrypt');
//
const Book = require('../models/book.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
//
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
// ---- Thêm sản phẩm
router.post('/addbook', upload.single('urlHinh'), (req, res) => {
  const data = req.body;
  const urlHinhi = req.file.filename;
  Book.add_book(data, urlHinhi, (response) => {
    res.send({ result: data });
  });
});

// ---- Xoá sản phẩm
router.delete('/delete/:idBook', (req, res) => {
  const idBook = req.params.idBook;
  Book.delete_book(idBook);
});

// ---- Cập nhật sản phẩm
router.put('/book/:idBook', upload.single('urlHinh'), (req, res) => {
  const bookId = req.params.idBook;
  const data = req.body;
  const urlHinhi = req.file.filename;
  Book.update_book(bookId, data, urlHinhi, (data) => {
    res.send({ result: data });
  });
});

// ---- Thêm danh mục
router.post('/category', (req, res) => {
  const data = req.body;
  Category.add_category(data, (data) => {
    res.send({ result: data });
  });
});

// ---- Lấy chi tiết danh mục
router.get('/category/:cateId', (req, res) => {
  const cateId = req.params.cateId;
  const data = req.body;
  Category.get_detail_category(cateId, (data) => {
    res.send({ result: data });
  });
});

// ---- Cập nhật danh mục
router.put('/category/:cateId', (req, res) => {
  const cateId = req.params.cateId;
  const data = req.body;
  Category.update_category(data, cateId, (datacallback) => {
    res.send({ result: datacallback });
  });
});

// ---- Xoá danh mục
router.delete('/category/:cateId', (req, res) => {
  const cateId = req.params.cateId;
  Category.delete_category(cateId, (result) => {
    res.send({ result: result });
  });
});

// Client
// ---- Lấy sách theo danh mục
router.get('/bookcate/:cateId', (req, res) => {
  const cateId = req.params.cateId;
  Book.get_category_id(cateId, (data) => {
    res.send({ result: data });
  });
});

// ---- Lấy tất cả danh mục
router.get('/category', (req, res) => {
  Category.get_category((data) => {
    res.send({ result: data });
  });
});

// ---- Lấy thông tin sản phẩm
router.get('/book/:idBook', (req, res) => {
  const bookId = req.params.idBook;
  Book.get_book_id(bookId, (data) => {
    res.send({ result: data });
  });
});

// ---- Lấy tất cả sản phẩm
router.get('/book', (req, res) => {
  Book.get_all_book((data) => {
    res.send({ result: data });
  });
});

// ------------------------------------
// User

// Tạo user
router.post('/register', (req, res) => {
  // Lấy từng thông tin
  const un = req.body.username;
  const ps = req.body.password;
  const ho = req.body.ho;
  const ten = req.body.ten;
  const email = req.body.email;
  const gioitinh = req.body.gioitinh;
  // const detail = req.body.detail;

  const salt = bcrypt.genSaltSync(10);
  const psauth = bcrypt.hashSync(ps, salt);

  const data = {
    username: un,
    password: psauth,
    ho: ho,
    ten: ten,
    email: email,
    gioitinh: gioitinh,
    // detail: detail,
  };
  User.create_account(data, (result) => {
    res.send({ result: result });
  });
});

// Lấy list user
router.get('/user/list', (req, res) => {
  User.get_list_user((data) => {
    res.send({ result: data });
  });
});

// Lấy thông tin user
router.get('/user/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  User.get_detail_user(idUser, (data) => {
    res.send({ result: data });
  });
});

// Cập nhật tài khoản
router.put('/user/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  const newData = req.body;
  User.update_user(newData, idUser, (data) => {
    res.send({ result: data });
  });
});

// Xoá tài khoản
router.delete('/user/:idUser', (req, res) => {
  const idUser = req.params.idUser;
  User.delete_user(idUser, (result) => {
    res.send({ result: result });
  });
});

module.exports = router;
