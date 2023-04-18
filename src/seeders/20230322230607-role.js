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
		return queryInterface.bulkInsert('role', [
			{
				name_role: 'Quản Trị Viên',
				short_role: 'qtv',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name_role: 'Cộng Tác Viên',
				short_role: 'ctv',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name_role: 'Khách Hàng',
				short_role: 'user',
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
	},
};
