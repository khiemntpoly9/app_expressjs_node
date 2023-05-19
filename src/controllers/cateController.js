import db from '../models/index.js';
const { Categories } = db;
import Sequelize from 'sequelize';

const CateController = {
	// Thêm Category
	createCate: async (req, res) => {
		const { name_categories, parent_id } = req.body;
		try {
			const categories = await Categories.create({ name_categories, parent_id });
			res.status(201).json({ message: 'Tạo danh mục thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: `${error}` });
		}
	},
	// Sửa thông tin Category
	updateCate: async (req, res) => {
		const { idcate } = req.query;
		const { name_categories, parent_id } = req.body;
		try {
			const numRows = await Categories.update(
				// UpdateAt thêm thời gian lúc update
				{ name_categories, parent_id, updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') },
				{ returning: true, where: { id_categories: idcate } },
			);
			if (numRows[0] === 0) {
				res.status(404).json({ message: 'Khômg tìm thấy danh mục!' });
				return;
			}
			const updatedCate = await Categories.findByPk(idcate);
			res.json({ message: 'Sửa danh mục thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},
	// Xoá Category
	deleteCate: async (req, res) => {
		const { idcate } = req.query;
		try {
			const deletedRows = await Categories.destroy({
				where: { id_categories: idcate },
			});
			if (deletedRows === 0) {
				res.status(404).json({ message: 'Không tìm thấy danh mục!' });
				return;
			}
			res.status(200).json({ message: 'Xoá danh mục thành công!' });
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},
	// Lấy tất cả Categories
	getAllCate: async (req, res) => {
		try {
			const categories = await Categories.findAll({});
			res.status(200).json(categories);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},
	// Lấy tất cả danh mục parent
	getParentCate: async (req, res) => {
		try {
			const categories = await Categories.findAll({
				where: {
					parent_id: null,
				},
			});
			res.status(200).json(categories);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},
	// Lấy thông tin Categories theo parent_id
	getCateById: async (req, res) => {
		// Param
		const { parentid } = req.query;
		try {
			// Dùng phương thức User.findByPk để tìm 'id' tương ứng
			const categories = await Categories.findAll({
				where: {
					parent_id: parentid,
				},
			});
			if (categories.length === 0) {
				res.status(404).json({ message: 'Không tìm thấy danh mục' });
				return;
			}
			res.status(200).json(categories);
		} catch (error) {
			console.log(error);
			res.status(500).send('Internal Server Error');
		}
	},
};

export default CateController;
