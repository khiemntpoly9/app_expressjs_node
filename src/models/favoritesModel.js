'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Favorites extends Model {
		static associate(models) {
			Favorites.hasMany(models.User, { foreignKey: 'id_user' });
			Favorites.hasMany(models.Product, { foreignKey: 'id_product' });
		}
	}
	Favorites.init(
		{
			id_favorites: {
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
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'favorites',
			modelName: 'Favorites',
		},
	);
	return Favorites;
};
