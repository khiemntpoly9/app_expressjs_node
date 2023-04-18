'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.createTable('forgotpasscode', {
			id_code: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			email_user: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			code: {
				type: Sequelize.STRING(255),
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
