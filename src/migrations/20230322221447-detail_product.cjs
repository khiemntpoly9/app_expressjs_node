'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('detail_product', {
		id_detail_main: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		detail_prod: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		description_prod: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		specification_prod: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
		preserve_prod: {
			type: Sequelize.TEXT,
			allowNull: true,
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
	await queryInterface.dropTable('detail_product');
}
