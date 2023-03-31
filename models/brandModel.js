'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Brand extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Brand.hasMany(models.Product, { foreignKey: 'brand_prod' });
		}
	}
	Brand.init(
		{
			id_brand: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_brand: {
				type: DataTypes.STRING(255),
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
			tableName: 'brands',
			modelName: 'Brand',
		}
	);
	return Brand;
};
