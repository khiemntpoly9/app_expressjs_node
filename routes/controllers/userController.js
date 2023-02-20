// import model User vào file  userController
const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const UserController = {
  // Auth Login
  authLogin: async (req, res) => {
    const { userName, password } = req.body;
    // Tìm kiếm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({
      where: {
        username: userName,
        password: password,
      },
    });
    // Kiểm tra tính hợp lệ của tên đăng nhập và mật khẩu
    if (!user) {
      return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không hợp lệ!' });
    }
    // Tạo mã thông báo (token) để xác thực yêu cầu của người dùng
    const token = jwt.sign({ sub: user.id }, 'secret_key');
    // Lưu trữ token trong cơ sở dữ liệu
    user.token = token;
    await user.save();
    // Trả về token cho trang đăng nhập
    res.json({
      id: user.id,
      username: user.userName,
      token: token,
    });
  },

  // Lấy tất cả thông tin user
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Lấy thông tin user theo ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      // Dùng phương thức User.findByPk để tìm 'id' tương ứng
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Tạo User
  // Tạo userName giống nhau sẽ bị lỗi, vì bên Model unique: true
  createUser: async (req, res) => {
    const { userName, password } = req.body;
    try {
      const user = await User.create({ userName, password });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Sửa thông tin User
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { fullName, password } = req.body;
    try {
      const numRows = await User.update(
        // UpdateAt thêm thời gian lúc update
        { fullName, password, updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') },
        { returning: true, where: { id } }
      );
      // Hàm update trả về một mảng có một phần tử, là số lượng bản ghi đã được cập nhật.
      // Nếu số lượng bản ghi này bằng 0, có nghĩa là không tìm thấy người dùng có ID bằng id,
      // ta gửi trả về một mã lỗi 404 và thông báo "User not found".
      if (numRows[0] === 0) {
        res.status(404).send('User not found');
        return;
      }
      const updatedUser = await User.findByPk(id);
      res.send(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Xoá User
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await User.destroy({
        where: { id },
      });
      if (deletedRows === 0) {
        res.status(404).send('User not found');
        return;
      }
      res.send('User deleted successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = UserController;
