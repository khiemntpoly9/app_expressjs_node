const db = require('../models/index');
const { Baove } = db;

const baoveController = {
	// Lấy tất cả items
	getAllItem: async (req, res) => {
		try {
			const items = await Baove.findAll({});
			res.status(200).json(items);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Lấy thông tin item
	detailItem: async (req, res) => {
		const { id } = req.query;
		try {
			const item = await Baove.findByPk(id);
			res.status(200).json(item);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Tạo item
	createItem: async (req, res) => {
		const { field_1, field_2, field_3 } = req.body;
		try {
			const item = await Baove.create({ field_1, field_2, field_3 });
			res.status(200).json(item);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Sửa item
	updateItem: async (req, res) => {
		const { id } = req.query;
		const { field_1, field_2, field_3 } = req.body;
		try {
			const updateItem = await Baove.update(
				{ field_1, field_2, field_3 },
				{ returning: true, where: { id: id } },
			);
			res.status(200).json(updateItem);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
	// Xoá item
	deleteItem: async (req, res) => {
		const { id } = req.query;
		try {
			const deletedItem = await Baove.destroy({
				where: { id: id },
			});
			res.status(200).json(deletedItem);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};

module.exports = baoveController;
