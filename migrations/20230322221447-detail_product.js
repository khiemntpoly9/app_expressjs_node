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
    await queryInterface.createTable('detail_product', {
      id_detail_main: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detail_prod: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description_prod: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      specification_prod: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      preserve_prod: {
        type: Sequelize.TEXT,
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
     * await queryInterface.dropTable('detail_product');
     */
    await queryInterface.dropTable('detail_product');
  },
};
