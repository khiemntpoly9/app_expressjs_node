'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Cart extends Model {
		static associate(models) {
			Cart.hasMany(models.User, { foreignKey: 'id_user' });
			Cart.hasMany(models.Product, { foreignKey: 'id_product' });
		}
	}
	Cart.init(
		{
			id_cart: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			id_product: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER(5),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'carts',
			modelName: 'Cart',
		},
	);
	return Cart;
};
