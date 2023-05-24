'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class HistoryProduct extends Model {
		static associate(models) {
			// define association here
			HistoryProduct.belongsTo(models.Product, { foreignKey: 'id_product' });
			HistoryProduct.belongsTo(models.User, { foreignKey: 'id_user' });
		}
	}
	HistoryProduct.init(
		{
			id_history: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_product: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			price_prod: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			id_user: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'product_history',
			modelName: 'HistoryProduct',
		},
	);
	return HistoryProduct;
};
