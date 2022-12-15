const db = require('../config/connectDB');

// Tạo tài khoản user
const create_account = (data, result) => {
  let sql =
    'INSERT INTO users (username, password, ho, ten, email, gioitinh, detail) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const data_us = [data.username, data.password, data.ho, data.ten, data.email, data.gioitinh, data.detail];
  db.query(sql, data_us, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Tạo tài khoản thành công!' });
    } else {
      result(err, null);
      return;
    }
  });
};

// Lấy danh sách tài khoản
const get_list_user = (result) => {
  let sql = 'SELECT idUser, username, ho, ten, email, gioitinh, detail FROM users';
  db.query(sql, (err, list_user) => {
    if (!err) {
      result(list_user);
    } else {
      console.log(err);
    }
  });
};

// Lấy thông tin tài khoản
const get_detail_user = (idUser, result) => {
  let sql = `SELECT ho, ten, email, gioitinh, detail FROM users WHERE idUser = ${idUser}`;
  db.query(sql, (err, dataUs) => {
    if (!err) {
      result(dataUs);
    } else {
      console.log(err);
    }
  });
};

// Sửa thông tin tài khoản
const update_user = (newData, idUser, result) => {
  let sql = `UPDATE users SET ho = ?, ten = ?, email = ?, gioitinh = ?, detail = ? WHERE idUser = ${idUser}`;
  const user_update = [newData.ho, newData.ten, newData.email, newData.gioitinh, newData.detail];
  db.query(sql, user_update, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Cập nhật thành công!' });
    } else {
      result(err, null);
      return;
    }
  });
};

// Delete user
const delete_user = (idUser, result) => {
  let sql = `DELETE FROM users WHERE idUser = ${idUser}`;
  db.query(sql, (err) => {
    if (!err) {
      result({ 'Trạng thái': 'Xoá thành công!' });
    } else {
      result({ 'Trạng thái': 'Xoá không thành công!' });
    }
  });
};

module.exports = {
  create_account,
  get_list_user,
  get_detail_user,
  update_user,
  delete_user,
};
