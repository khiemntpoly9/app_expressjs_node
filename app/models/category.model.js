const db = require('../config/connectDB');
const fs = require('fs');
const path = require('path');

// Lấy loại sản phẩm
const get_category = (result) => {
  let sql = 'SELECT id, tenLoai from loai';
  db.query(sql, (err, book_cat) => {
    if (!err) {
      result(book_cat);
    } else {
      console.log(err);
    }
  });
};

// Tạo danh mục
const add_category = (newData, result) => {
  let sql = 'INSERT INTO loai (tenLoai, anHien) VALUES (?, ?)';
  const data_item = [newData.tenLoai, newData.anHien];
  db.query(sql, data_item, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Thêm thành công!' });
    } else {
      result(err, null);
      return;
    }
  });
};

// Update danh mục
const update_category = (newData, cateId, result) => {
  let sql = `UPDATE loai SET tenLoai = ?, anHien = ? WHERE id = ${cateId}`;
  const data_update = [newData.tenLoai, newData.anHien];
  db.query(sql, data_update, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Cập nhật thành công!' });
    } else {
      result(err, null);
      return;
    }
  });
};

// Lấy chi tiết danh mục
const get_detail_category = (idCategory, result) => {
  let sql = 'SELECT * FROM loai WHERE id = ?';
  db.query(sql, idCategory, (err, cate_detail) => {
    if (!err) {
      result(cate_detail);
    } else {
      console.log(err);
    }
  });
};

// Xoá danh mục
const delete_category = (idCategory, result) => {
  // Xoá database
  let sql = `DELETE FROM loai WHERE id=?`;
  db.query(sql, idCategory, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Xoá thành công!' });
    } else {
      result({ 'Trạng thái': 'Xoá không thành công!' });
    }
  });
};

module.exports = {
  get_category,
  add_category,
  get_detail_category,
  update_category,
  delete_category,
};
