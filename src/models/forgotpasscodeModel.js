'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
	class PassCode extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PassCode.init(
		{
			id_code: {
				type: DataTypes.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			email_user: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: 'forgotpasscode',
			modelName: 'PassCode',
		},
	);
	return PassCode;
};
