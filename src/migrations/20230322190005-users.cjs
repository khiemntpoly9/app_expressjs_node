'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
	await queryInterface.createTable('users', {
		id_user: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		first_name: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		last_name: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING(10),
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: false,
		},
		id_role: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: 3,
			references: {
				model: {
					tableName: 'role',
					schema: 'schema',
				},
				key: 'id_role',
			},
		},
		token: {
			type: Sequelize.STRING(255),
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
	await queryInterface.dropTable('users');
}
