'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('category_child', {
		id_category_child: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name_category_child: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		id_category_product: {
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
	// Tạo khoá phụ
	await queryInterface.addConstraint('category_child', {
		fields: ['id_category_product'],
		type: 'foreign key',
		// Tên ràng buộc
		name: 'category_child_fk_1',
		references: {
			table: 'category',
			field: 'id_category',
		},
	});
}
export async function down(queryInterface, Sequelize) {
	await queryInterface.dropTable('category_child');
}
