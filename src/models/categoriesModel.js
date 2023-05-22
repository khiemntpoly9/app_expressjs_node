'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Categories extends Model {
		static associate(models) {
			Categories.hasMany(models.Categories, { foreignKey: 'parent_id' });
			Categories.hasMany(models.Categories, { as: 'children', foreignKey: 'parent_id' });
			Categories.belongsTo(models.Categories, { as: 'parent', foreignKey: 'parent_id' });
		}
	}
	Categories.init(
		{
			id_categories: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_categories: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			parent_id: {
				type: DataTypes.INTEGER(11),
				allowNull: true,
				defaultValue: null,
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
			tableName: 'categories',
			modelName: 'Categories',
		},
	);
	return Categories;
};
