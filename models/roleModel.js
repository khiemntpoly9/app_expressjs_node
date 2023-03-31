'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Role.hasMany(models.User, { foreignKey: 'id_role' });
		}
	}
	Role.init(
		{
			id_role: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_role: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			short_role: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: true,
			tableName: 'role',
			modelName: 'Role',
		}
	);
	return Role;
};
