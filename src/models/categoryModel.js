'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class Category extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// Một Category lớn có nhiều Category Child
			Category.hasMany(models.CategoryChild, { foreignKey: 'id_category_product' });
		}
	}
	Category.init(
		{
			id_category: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_category: {
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
			tableName: 'category',
			modelName: 'Category',
		},
	);
	return Category;
};
