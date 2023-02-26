const jwt = require('jsonwebtoken');
const User = require('../models/dbModel');

const authenticateToken = async (req, res, next) => {
  // Lấy token từ header của yêu cầu
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    // Nếu không tìm thấy token, trả về lỗi 401
    return res.status(401).json({ message: 'Không tìm thấy Token!' });
  }
  try {
    // Giải mã token để lấy ra định danh của người dùng
    const decoded = jwt.verify(token, 'secret_key');
    // Tìm kiếm người dùng trong cơ sở dữ liệu để kiểm tra tính hợp lệ của token
    const user = await User.findByPk(decoded.sub);
    if (!user) {
      // Nếu không tìm thấy người dùng, trả về lỗi 401
      return res.status(401).json({ message: 'Không tìm thấy tài khoản!' });
    }
    // Lưu thông tin người dùng vào yêu cầu để sử dụng cho các tác vụ sau này
    req.user = user;
    next();
  } catch (err) {
    // Nếu giải mã token bị lỗi, trả về lỗi 403
    return res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = authenticateToken;
