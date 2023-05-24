'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			User.belongsTo(models.Role, { foreignKey: 'id_role' });
			User.belongsTo(models.Cart, { foreignKey: 'id_user' });
			User.belongsTo(models.Favorites, { foreignKey: 'id_user' });
			User.hasMany(models.HistoryProduct, { foreignKey: 'id_user' });
		}
	}
	User.init(
		{
			id_user: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			first_name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			phone: {
				type: DataTypes.INTEGER(10),
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			id_role: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				defaultValue: 3,
			},
			token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'users',
			modelName: 'User',
		},
	);
	return User;
};
