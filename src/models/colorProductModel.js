'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class ColorProduct extends Model {
		static associate(models) {
			// define association here
			ColorProduct.hasOne(models.Product, { foreignKey: 'id_product' });
		}
	}
	ColorProduct.init(
		{
			product_id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				allowNull: false,
			},
			color_id: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'product_color',
			modelName: 'ColorProduct',
		},
	);
	return ColorProduct;
};
