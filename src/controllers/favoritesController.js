import db from '../models/index.js';
const { Favorites, Product, ImgProduct } = db;

const favoritesController = {
	// Thêm yêu thích
	addFavorite: async (req, res) => {
		// id user
		const { userId } = req.user;
		// id sản phẩm
		const { id_prod } = req.query;
		try {
			// Check sản phẩm
			const checkProduct = await Product.findOne({ where: { id_product: id_prod } });
			if (!checkProduct) {
				res.json({ message: 'Sản phẩm không tồn tại!' });
			} else {
				// Check tồn tại yêu thích
				const checkFavorite = await Favorites.findOne({ where: { id_user: userId, id_product: id_prod } });
				if (!checkFavorite) {
					const favorite = await Favorites.create({ id_user: userId, id_product: id_prod });
					res.status(201).json({ message: 'Thêm vào yêu thích!' });
				} else {
					res.json({ message: 'Sản phẩm đã tồn tại trong yêu thích!' });
				}
			}
		} catch (error) {
			console.log(error);
			res.json({ message: 'Internal Server Error' });
		}
	},
	// Xoá yêu thích
	delFavorite: async (req, res) => {
		// id user
		const { userId } = req.user;
		// id sản phẩm
		const { id_prod } = req.query;
		try {
			const checkFavorite = await Favorites.findOne({ where: { id_user: userId, id_product: id_prod } });
			if (checkFavorite) {
				// Nếu có tồn tại
				const delfavorite = await Favorites.destroy({
					where: { id_user: userId, id_product: id_prod },
				});
				res.status(201).json({ message: 'Xoá khỏi yêu thích!' });
			} else {
				res.json({ message: 'Sản phẩm không tồn tại trong yêu thích của bạn!' });
			}
		} catch (error) {
			// console.log(error);
			res.json({ message: 'Internal Server Error' });
		}
	},
	// Lấy tất cả sản phẩm yêu thích
	getAllFavorite: async (req, res) => {
		const { userId } = req.user;
		try {
			const favorite = await Favorites.findAll({
				where: { id_user: userId },
				attributes: ['id_favorites'],
				include: [
					{
						model: Product,
						attributes: ['id_product', 'name_prod'],
						include: [{ model: ImgProduct, attributes: ['img_1'] }],
					},
				],
			});
			res.status(200).json(favorite);
		} catch (error) {
			res.json({ message: 'Internal Server Error' });
		}
	},
};

export default favoritesController;
