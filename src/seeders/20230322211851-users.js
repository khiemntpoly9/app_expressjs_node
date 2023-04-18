'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		return queryInterface.bulkInsert('users', [
			{
				first_name: 'Nguyễn',
				last_name: 'Trung Khiêm',
				email: 'khiemntps@gmail.com',
				phone: '0134361843',
				password: 'khiem1412fpt',
				id_role: 3,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				first_name: 'Nguyễn',
				last_name: 'Trung Khiêm',
				email: 'khiemntps1@gmail.com',
				phone: '0134361843',
				password: 'khiem1412fpt',
				id_role: 2,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				first_name: 'Nguyễn',
				last_name: 'Trung Khiêm',
				email: 'khiemntps2@gmail.com',
				phone: '0134361843',
				password: 'khiem1412fpt',
				id_role: 1,
				token: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('users', null, {});
	},
};
