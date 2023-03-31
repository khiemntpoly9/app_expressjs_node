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
		await queryInterface.createTable('product_color', {
			product_id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				allowNull: false,
			},
			color_id: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				allowNull: false,
			},
			// createdAt: {
			//   allowNull: false,
			//   type: Sequelize.DATE
			// },
			// updatedAt: {
			//   allowNull: false,
			//   type: Sequelize.DATE
			// }
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.dropTable('product_color');
	},
};
