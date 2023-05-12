'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('products', {
		id_product: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name_prod: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		cate_child_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		brand_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		id_detail_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		price_prod: {
			type: Sequelize.DECIMAL(10, 0),
			allowNull: false,
		},
		material_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		img_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		style_prod: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	});
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('products');
}
