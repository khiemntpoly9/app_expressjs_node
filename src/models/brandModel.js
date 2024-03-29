'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Brand extends Model {
		static associate(models) {
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
		},
	);
	return Brand;
};
