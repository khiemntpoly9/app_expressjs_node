'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('colors', {
		id_color: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		name_color: {
			type: Sequelize.STRING(30),
			allowNull: false,
		},
		hex_color: {
			type: Sequelize.STRING(7),
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
	await queryInterface.dropTable('colors');
}
