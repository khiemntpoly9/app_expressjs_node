'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Product extends Model {
		static associate(models) {
			// define association here
			Product.belongsTo(models.CategoryChild, { foreignKey: 'cate_child_prod' });
			Product.belongsTo(models.Brand, { foreignKey: 'brand_prod' });
			Product.hasMany(models.ImgProduct, { foreignKey: 'id_product' });
			Product.hasOne(models.DetailProduct, { foreignKey: 'id_product' });
			Product.belongsToMany(models.Colors, { through: models.ColorProduct, foreignKey: 'product_id' });
			Product.belongsTo(models.Cart, { foreignKey: 'id_product' });
			Product.hasMany(models.Favorites, { foreignKey: 'id_product' });
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
			price_prod: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			material_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
			},
			style_prod: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
			},
			img_thumnail: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			discount: {
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
