'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Discount extends Model {
		static associate(models) {
			// Favorites.hasMany(models.User, { foreignKey: 'id_user' });
			// Favorites.belongsTo(models.Product, { foreignKey: 'id_product' });
		}
	}
	Discount.init(
		{
			id_discount: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			discount_percent: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'discount',
			modelName: 'Discount',
		},
	);
	return Discount;
};
