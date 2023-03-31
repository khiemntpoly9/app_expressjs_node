'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
			id_user: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER(11),
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
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users');
	},
};
