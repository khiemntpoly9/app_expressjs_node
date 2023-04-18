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
		await queryInterface.createTable('img_product', {
			id_images: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			img_1: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			img_2: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			img_3: {
				type: Sequelize.STRING(255),
				allowNull: true,
			},
			img_4: {
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
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('img_product');
		 */
		await queryInterface.dropTable('img_product');
	},
};
