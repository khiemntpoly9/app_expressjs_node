'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class CategoryChild extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			CategoryChild.hasMany(models.Product, { foreignKey: 'cate_child_prod' });
			CategoryChild.belongsTo(models.Category, { foreignKey: 'id_category_product' });
		}
	}
	CategoryChild.init(
		{
			id_category_child: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name_category_child: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			id_category_product: {
				type: DataTypes.INTEGER(11),
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
			tableName: 'category_child',
			modelName: 'CategoryChild',
		},
	);
	return CategoryChild;
};
