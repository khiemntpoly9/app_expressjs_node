/* eslint-disable import/named */
/* eslint-disable no-undef */
import db from '../models/index.js';
const { User, Role, PassCode } = db;
import Sequelize, { Op } from 'sequelize';
// Mail app
import mailApp from '../mail/mailApp.js';
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
//
import jwt from 'jsonwebtoken';
// Sử dụng biến môi trường JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

// Mã hoá mật khẩu
import bcryptjs from 'bcryptjs';
const saltRounds = 10;

const UserController = {
	// Lấy tất cả Account
	getAllUsers: async (req, res) => {
		try {
			const users = await User.findAll({
				attributes: ['id_user', 'first_name', 'last_name', 'email', 'phone'],
				include: [
					{
						model: Role,
						attributes: ['name_role', 'short_role'],
					},
					// {
					//   model: Address,
					//   attributes: ['id_address', 'name_address'],
					// },
				],
			});
			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},

	// Lấy thông tin Role
	getRoleDetail: async (req, res) => {
		try {
			const listrole = await Role.findAll();
			res.status(200).json(listrole);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},

	// Lấy thông tin user theo ID
	getUserById: async (req, res) => {
		const { userId } = req.user;
		try {
			// Dùng phương thức User.findByPk để tìm 'id' tương ứng
			const user = await User.findByPk(userId, {
				attributes: ['id_user', 'first_name', 'last_name', 'email', 'phone'],
				include: [
					{
						model: Role,
						attributes: ['name_role', 'short_role'],
					},
					// {
					//   model: Address,
					//   attributes: ['id_address', 'name_address'],
					// },
				],
			});
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},

	// Lấy thông tin User quản lý
	getUserByIdManage: async (req, res) => {
		const { userid } = req.query;
		try {
			// Dùng phương thức User.findByPk để tìm 'id' tương ứng
			const user = await User.findByPk(userid, {
				attributes: ['id_user', 'first_name', 'last_name', 'email', 'phone'],
				include: [
					{
						model: Role,
						attributes: ['name_role', 'short_role'],
					},
					// {
					//   model: Address,
					//   attributes: ['id_address', 'name_address'],
					// },
				],
			});
			if (!user) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.status(200).json(user);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},

	// Sửa thông tin User
	updateUser: async (req, res) => {
		const { id } = req.query;
		const { first_name, last_name, phone } = req.body;
		try {
			// Mã hoá mật khẩu
			// const salt = await bcryptjs.genSalt(saltRounds);
			// const hashedPassword = await bcryptjs.hash(password, salt);
			// Đầu tiên cho so sánh mật khẩu
			const numRows = await User.update(
				// UpdateAt thêm thời gian lúc update
				{
					first_name,
					last_name,
					phone,
					// password: hashedPassword,
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{ returning: true, where: { id_user: id } },
			);
			// Hàm update trả về một mảng có một phần tử, là số lượng bản ghi đã được cập nhật.
			// Nếu số lượng bản ghi này bằng 0, có nghĩa là không tìm thấy người dùng có ID bằng id,
			// ta gửi trả về một mã lỗi 404 và thông báo "User not found".
			if (numRows[0] === 0) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			// Lỗi numRows trả về 1 mảng [undefined, 0]
			const updatedUser = await User.findByPk(id, { attributes: ['first_name', 'last_name', 'phone'] });
			res.send(updatedUser);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},

	// Đổi mật khẩu
	changePassword: async (req, res) => {
		const { id } = req.query;
		const { password, newpassword } = req.body;
		try {
			const user = await User.findOne({
				where: {
					id_user: id,
				},
			});
			if (!user) {
				return res.status(401).json({ message: 'Tài khoản không tồn tại!' });
			}
			// So sánh mật khẩu
			const passwordMatches = await bcryptjs.compare(password, user.password);
			if (!passwordMatches) {
				return res.status(401).json({ message: 'Mật khẩu không hợp lệ!' });
			}
			// Mã hoá mật khẩu mới
			const salt = await bcryptjs.genSalt(saltRounds);
			const hashedPassword = await bcryptjs.hash(newpassword, salt);
			// Đổi mật khẩu
			const numRows = await User.update(
				// UpdateAt thêm thời gian lúc update
				{
					password: hashedPassword,
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{ returning: true, where: { id_user: id } },
			);
			if (numRows[0] === 0) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.json({ message: 'Đổi mật khẩu thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Tạo mã khôi phục mật khẩu
	forgotpass: async (req, res) => {
		// Tạo 6 số ngẫu nhiên
		let randomNum = Math.floor(Math.random() * 1000000);
		// Định dạng số thành chuỗi 6 chữ số
		let formattedNum = String(randomNum).padStart(6, '0');
		// Tỷ lệ cả 6 số trung nhau 0,027%
		const user = req.user;
		try {
			// Kiểm tra email đã có trong danh sách khôi phục!
			const existingUser = await PassCode.findOne({ where: { email_user: user.email } });
			if (existingUser) {
				res.status(400).json({ message: 'Hãy thử lại sau ít phút!' });
			} else {
				// Upload data
				const passCode = await PassCode.create({
					email_user: user.email,
					code: formattedNum,
					createdAt: Date.now(),
				});
				// Gửi mail khi tạo mã thành công
				mailApp.forgotpass(formattedNum, user.email);
				// Tạo mã thông báo (token) để xác thực yêu cầu của người dùng
				const token = jwt.sign({ email_user: user.email }, JWT_SECRET);
				res
					.cookie('forgot_auth', token, { httpOnly: true })
					.json({ message: 'Tạo mã khôi phục thành công!' });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error!' });
		}
	},

	// Check code
	checkCodeForgot: async (req, res) => {
		const token = req.cookies.forgot_auth;
		const { code_auth } = req.body;
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			// Check xem mã xác thực còn hiệu lực
			const user_code = await PassCode.findOne({
				where: {
					email_user: decoded.email_user,
				},
			});
			// Check điều kiện
			if (!user_code) {
				return res
					.clearCookie('forgot_auth', { sameSite: 'none', secure: true })
					.json({ message: 'Mã xác thực đã hết hạn! Vui lòng thử lại' });
			}
			// console.log(user_code.code);
			if (code_auth == user_code.code) {
				// Xoá mã code
				const deletedRows = await PassCode.destroy({
					where: { id_code: user_code.id_code },
				});
				// Xoá cookies
				return res.json({ message: 'Mã xác thực đúng!', setPage: '/resetpass' });
			} else {
				return res.json({ message: 'Mã xác thực sai! Vui lòng thử lại' });
			}
		} catch (error) {
			return res.status(403).json({ message: 'Lỗi xác thực token!' });
		}
	},

	// Tạo mật khẩu mới
	changeNewPass: async (req, res) => {
		const token = req.cookies.forgot_auth;
		const { passNew } = req.body;
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			const user = await User.findOne({
				where: {
					email: decoded.email_user,
				},
			});
			// Mã hoá mật khẩu mới
			const salt = await bcryptjs.genSalt(saltRounds);
			const hashedPassword = await bcryptjs.hash(passNew, salt);
			// Đổi mật khẩu
			const numRows = await User.update(
				// UpdateAt thêm thời gian lúc update
				{
					password: hashedPassword,
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{ returning: true, where: { id_user: user.id_user } },
			);
			res
				.clearCookie('forgot_auth', { sameSite: 'none', secure: true })
				.json({ message: 'Chúc mừng bạn đăng đăng ký mới mật khẩu thành công!' });
		} catch (error) {
			console.log(erro);
		}
	},

	// Đổi role tài khoản
	changeRole: async (req, res) => {
		const { id } = req.query;
		const { newRole } = req.body;
		try {
			const numRows = await User.update(
				// UpdateAt thêm thời gian lúc update
				{
					id_role: newRole,
					updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				{ returning: true, where: { id_user: id } },
			);
			if (numRows[0] === 0) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.json({ message: 'Đổi quyền tài khoản thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},

	// Xoá User
	deleteUser: async (req, res) => {
		const { id } = req.query;
		try {
			const deletedRows = await User.destroy({
				where: { id_user: id },
			});
			if (deletedRows === 0) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			res.json({ message: 'User deleted successfully' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};

// Xoá các code đã quá hạn
// async function deleteExpiredCodes() {
// 	const expiredCodes = await PassCode.findAll({
// 		where: {
// 			createdAt: {
// 				// lấy tất cả các PassCode có thời gian tạo trước 5 phút trước đó
// 				[Op.lt]: new Date(Date.now() - 5 * 60 * 1000),
// 			},
// 		},
// 	});

// 	// Xoá tất cả các PassCode hết hạn
// 	for (const code of expiredCodes) {
// 		await code.destroy();
// 	}
// 	// console.log(`Đã xoá ${expiredCodes.length} code đã quá hạn.`);
// 	// Gọi lại hàm deleteExpiredCodes sau 5 phút
// 	setTimeout(deleteExpiredCodes, 60 * 1000);
// }
// deleteExpiredCodes();

export default UserController;
