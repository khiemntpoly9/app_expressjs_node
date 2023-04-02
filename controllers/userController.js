const db = require('../models/index');
const { User, Role } = db;
// .ENV
require('dotenv').config();

const Sequelize = require('sequelize');

const bcryptjs = require('bcryptjs');
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
		const { id } = req.query;
		try {
			// Dùng phương thức User.findByPk để tìm 'id' tương ứng
			const user = await User.findByPk(id, {
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
				{ returning: true, where: { id_user: id } }
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
				{ returning: true, where: { id_user: id } }
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
				{ returning: true, where: { id_user: id } }
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

module.exports = UserController;
