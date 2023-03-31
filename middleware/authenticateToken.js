const db = require('../models/index');
const { User, Role } = db;
const jwt = require('jsonwebtoken');

// .ENV
require('dotenv').config();
// Sử dụng biến môi trường JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = {
	// Admin
	adminRole: async (req, res, next) => {
		// Lấy token từ header của yêu cầu
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			console.log(decoded.role);
			if (decoded.role == 'qtv') {
				next();
			} else {
				return res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
			}
		} catch (error) {
			return res.status(403).json({ message: 'Lỗi xác thực token!' });
		}
	},
	// Cộng tác viên
	ctvRole: async (req, res, next) => {
		// Lấy token từ header của yêu cầu
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			console.log(decoded.role);
			if (decoded.role == 'ctv') {
				next();
			} else {
				return res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
			}
		} catch (error) {
			return res.status(403).json({ message: 'Lỗi xác thực token!' });
		}
	},
	// Thêm sản phẩm

	// Đăng xuất
	authLogout: async (req, res, next) => {
		// Lấy token từ header của yêu cầu
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
		}
		try {
			// Giải mã token để lấy ra định danh của người dùng
			const decoded = jwt.verify(token, JWT_SECRET);
			// Tìm kiếm người dùng trong cơ sở dữ liệu để kiểm tra tính hợp lệ của token
			const user = await User.findByPk(decoded.userId);
			if (!user) {
				// Nếu không tìm thấy người dùng, trả về lỗi 401
				return res.status(401).json({ message: 'Không tìm thấy tài khoản!' });
			}
			// Lưu thông tin người dùng vào yêu cầu để sử dụng cho các tác vụ sau này
			req.user = user;
			// Chuyển qua middleware sau
			next();
		} catch (err) {
			// Nếu giải mã token bị lỗi, trả về lỗi 403
			return res.status(403).json({ message: 'Forbidden' });
		}
	},
};

module.exports = authenticateToken;
