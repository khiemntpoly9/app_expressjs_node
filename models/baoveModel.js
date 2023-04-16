'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Baove extends Model {
		static associate(models) {
			// define association here
			// Brand.hasMany(models.Product, { foreignKey: 'brand_prod' });
		}
	}
	Baove.init(
		{
			id: {
				type: DataTypes.INTEGER(10),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			field_1: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			field_2: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			field_3: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'baove',
			modelName: 'Baove',
		},
	);
	return Baove;
};
