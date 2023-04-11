'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Product extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Product.belongsTo(models.CategoryChild, { foreignKey: 'cate_child_prod' });
			Product.belongsTo(models.Brand, { foreignKey: 'brand_prod' });
			Product.belongsTo(models.ImgProduct, { foreignKey: 'img_prod' });
			Product.belongsTo(models.DetailProduct, { foreignKey: 'id_detail_prod' });
			Product.belongsToMany(models.Colors, { through: models.ColorProduct, foreignKey: 'product_id' });
		}
	}
	Product.init(
		{
			id_product: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_prod: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			cate_child_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			brand_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			id_detail_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			price_prod: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			material_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
			},
			img_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			style_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'products',
			modelName: 'Product',
		},
	);
	return Product;
};
