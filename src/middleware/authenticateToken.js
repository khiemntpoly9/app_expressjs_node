/* eslint-disable no-undef */
import db from '../models/index.js';
const { User } = db;
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
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
		// Kiểm tra trùng khớp 2 token
		const tokenCurr = await User.findOne({ where: { token: token } });
		// eslint-disable-next-line security/detect-possible-timing-attacks
		if (tokenCurr == null) {
			return res.json({ message: 'Token không trùng khớp!' });
		} else {
			try {
				const decoded = jwt.verify(token, JWT_SECRET);
				// console.log(decoded.role);
				if (decoded.role == 'qtv') {
					next();
				} else {
					return res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
				}
			} catch (error) {
				return res.status(403).json({ message: 'Lỗi xác thực token!' });
			}
		}
	},
	// Cộng tác viên
	ctvRole: async (req, res, next) => {
		// Lấy token từ header của yêu cầu
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
		}
		// Kiểm tra trùng khớp 2 token
		const tokenCurr = await User.findOne({ where: { token: token } });
		// eslint-disable-next-line security/detect-possible-timing-attacks
		if (tokenCurr == null) {
			return res.json({ message: 'Token không trùng khớp!' });
		} else {
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
		}
	},
	// Manager Role - Cả 2 role quản lý
	manageRole: async (req, res, next) => {
		// Lấy token từ header của yêu cầu
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Không tìm thấy token xác thực!' });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			if (decoded.role == 'qtv' || decoded.role == 'ctv') {
				next();
			} else {
				return res.status(401).json({ message: 'Bạn không có quyền truy cập!' });
			}
		} catch (error) {
			return res.status(403).json({ error: error });
		}
	},
	// Đổi mật khẩu, check tài khoản có tồn tại
	checkUser: async (req, res, next) => {
		const { email } = req.body;
		try {
			// Tìm kiếm người dùng trong cơ sở dữ liệu
			const user = await User.findOne({
				where: {
					email: email,
				},
			});
			// Kiểm tra tài khoản có tồn tại
			if (!user) {
				return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
			}
			req.user = user;
			next();
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Check login
	checkLogin: async (req, res, next) => {
		// Lấy Token
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			return res.status(403).json({ error: 'Lỗi xác thực token!' });
		}
	},
	// Check login cart
	isLogin: async (req, res, next) => {
		// Lấy Token
		const token = req.cookies.access_token;
		const isLogin = !token ? false : true;
		try {
			req.isLogin = isLogin;
			next();
		} catch (error) {
			return res.status(403).json({ error: error });
		}
	},
};

export default authenticateToken;
