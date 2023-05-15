'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class ImagesProduct extends Model {
		static associate(models) {
			// define association here
			ImagesProduct.belongsTo(models.Product, { foreignKey: 'id_product' });
		}
	}
	ImagesProduct.init(
		{
			id_images: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_product: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
			},
			url: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'img_product',
			modelName: 'ImgProduct',
		},
	);
	return ImagesProduct;
};
