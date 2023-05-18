'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class DetailProduct extends Model {
		static associate(models) {
			// define association here
			DetailProduct.belongsTo(models.Product, { foreignKey: 'id_product' });
		}
	}
	DetailProduct.init(
		{
			id_detail: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_product: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				unique: true,
			},
			detail_prod: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			description_prod: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			specification_prod: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			preserve_prod: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'detail_product',
			modelName: 'DetailProduct',
		},
	);
	return DetailProduct;
};
