/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
import db from '../models/index.js';
const { User, Role } = db;
import jwt from 'jsonwebtoken';
// Mail app
import mailApp from '../mail/mailApp.js';
import bcryptjs from 'bcryptjs';
const saltRounds = 10;

import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
// Sử dụng biến môi trường JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
	// Đăng ký
	// Tạo userName giống nhau sẽ bị lỗi, vì bên Model unique: true
	authRegister: async (req, res) => {
		const { first_name, last_name, phone, email, password } = req.body;
		try {
			// Kiểm tra userName tồn tại chưa
			const existingUser = await User.findOne({ where: { email: email } });
			if (existingUser) {
				res.status(400).json({ message: 'Tài khoản đã tồn tại' });
			} else {
				// Mã hoá mật khẩu
				const salt = await bcryptjs.genSalt(saltRounds);
				const hashedPassword = await bcryptjs.hash(password, salt);
				// Upload data
				const user = await User.create({ first_name, last_name, phone, email, password: hashedPassword });
				// Gửi mail khi tạo tài khoản thành công
				// mailApp.createAccount(last_name, email);
				// End mail
				res.status(201).json({ message: 'Tạo tài khoản thành công!' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error!' });
		}
	},
	// Đăng nhập
	authLogin: async (req, res) => {
		const { email, password } = req.body;
		// Tìm kiếm người dùng trong cơ sở dữ liệu
		const user = await User.findOne({
			where: {
				email: email,
			},
			include: {
				model: Role,
				attributes: ['name_role', 'short_role'],
			},
		});
		// Kiểm tra tài khoản có tồn tại
		if (!user) {
			return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
		}
		// So sánh mật khẩu
		const passwordMatches = await bcryptjs.compare(password, user.password);
		if (!passwordMatches) {
			return res.status(401).json({ message: 'Mật khẩu sai! Vui lòng nhập lại' });
		}
		// Tạo mã thông báo (token) để xác thực yêu cầu của người dùng
		const token = jwt.sign(
			{ userId: user.id_user, fullName: user.last_name, role: user.Role.short_role },
			JWT_SECRET,
		);
		// Lưu trữ token trong cơ sở dữ liệu
		user.token = token;
		await user.save();
		// Trả về cookie lưu ở người dùng
		// Check role người dùng khi đăng nhập
		switch (user.Role.short_role) {
			case 'qtv':
				return res
					.cookie('access_token', token, { httpOnly: true })
					.json({ message: 'Đăng nhập thành công! QTV', role: 'qtv' });
				break;
			case 'ctv':
				return res
					.cookie('access_token', token, { httpOnly: true })
					.json({ message: 'Đăng nhập thành công! CTV', role: 'ctv' });
				break;
			default:
				return res
					.cookie('access_token', token, { httpOnly: true })
					.json({ message: 'Đăng nhập thành công! User', role: 'user' });
		}
	},
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
			// Set token null
			user.token = null;
			await user.save();
			res
				// Xoá cookie
				.clearCookie('access_token', { sameSite: 'none', secure: true })
				.json({ message: 'Đăng xuất thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};

export default authController;
