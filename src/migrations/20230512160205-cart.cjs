'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('cart', {
			id_cart: {
				type: Sequelize.INTEGER(11),
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: {
						tableName: 'users',
						schema: 'schema',
					},
					key: 'id_user',
				},
			},
			id_product: {
				type: Sequelize.INTEGER(11),
				allowNull: false,
				references: {
					model: {
						tableName: 'products',
						schema: 'schema',
					},
					key: 'id_product',
				},
			},
			quantity: {
				type: Sequelize.INTEGER(5),
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('carts');
	},
};
