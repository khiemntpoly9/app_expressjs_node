const db = require('../config/connectDB');
const fs = require('fs');
const path = require('path');

// Lấy tất cả sản phẩm
const get_all_book = (result) => {
  let sql = `SELECT * FROM sach`;
  return db.query(sql, (err, book) => {
    if (!err) {
      result(book);
    } else {
      console.log(err);
    }
  });
};

// Lấy thông tin sản phẩm theo ID & update
const get_book_id = (idBook, result) => {
  let sql = `SELECT * FROM sach WHERE id = ?`;
  db.query(sql, idBook, (err, book_info) => {
    if (!err) {
      result(book_info);
    } else {
      console.log(err);
    }
  });
};

// Update thông tin sách
const update_book = (idBook, data, urlHinh, result) => {
  let sql = `UPDATE sach SET tenSach = ?, moTa = ?, urlHinh = ?, gia = ?, idLoai = ?, anHien = ? WHERE id = ${idBook}`;
  let databook = [data.tenSach, data.moTa, urlHinh, data.gia, data.idLoai, data.anHien];
  db.query(sql, databook, (err) => {
    if (!err) {
      result({ 'Tình trạng': 'Thành công!' });
    } else {
      console.log(err);
    }
  });
};

// Lấy sản phẩm theo loại
const get_category_id = (cateId, result) => {
  let sql = `SELECT * FROM sach WHERE idLoai=${cateId}`;
  db.query(sql, (err, book) => {
    if (!err) {
      result(book);
    } else {
      console.log(err);
    }
  });
};

// Thêm sản phẩm
const add_book = (newData, urlImages, result) => {
  let sql = `INSERT INTO sach (tenSach, moTa, urlHinh, gia, idLoai, anHien) VALUES (?, ?, ?, ?, ?, ?)`;
  const datas = [newData.tenSach, newData.moTa, urlImages, newData.gia, newData.idLoai, newData.anHien];
  db.query(sql, datas, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Thêm thành công!' });
    } else {
      result(err, null);
      return;
    }
  });
};

// Xoá sản phẩm
const delete_book = (idBook) => {
  // Xoá hình trước
  // Lấy name images
  let getImageDelete = `SELECT urlHinh FROM sach WHERE id=?`;
  db.query(getImageDelete, idBook, (err, result) => {
    if (!err) {
      // xoá file
      // Truyền vào đường dẫn + name file
      const data = { ...result };
      const nameImges = data['0'].urlHinh;
      // Đường dẫn thư mục file
      const pathdelete = path.join(__dirname, '../../public/images');
      fs.unlinkSync(`${pathdelete}/${nameImges}`);
      console.log('Trạng thái: Xoá file thành công!');
    } else {
      console.log('Trạng thái: Xoá file thất bại!');
    }
  });
  // Xoá database
  let sql = `DELETE FROM sach WHERE id=?`;
  db.query(sql, idBook, (err) => {
    if (!err) {
      console.log('Trạng thái: Xoá thành công!');
    } else {
      console.log('Trạng thái: Xoá thất bại!');
    }
  });
};

module.exports = {
  get_all_book,
  get_category_id,
  get_book_id,
  update_book,
  add_book,
  delete_book,
};
