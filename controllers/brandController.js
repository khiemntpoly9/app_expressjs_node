const db = require('../models/index');
const { Brand } = db;

const BrandController = {
	// Lấy tất cả thương hiệu
	getAllBrand: async (req, res) => {
		try {
			const brands = await Brand.findAll({});
			res.status(200).json(brands);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	},
};

module.exports = BrandController;
