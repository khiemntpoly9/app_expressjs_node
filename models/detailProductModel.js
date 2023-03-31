'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailProduct.hasOne(models.Product, { foreignKey: 'id_detail_prod' });
    }
  }
  DetailProduct.init(
    {
      id_detail_main: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      detail_prod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description_prod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      specification_prod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      preserve_prod: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'detail_product',
      modelName: 'DetailProduct',
    }
  );
  return DetailProduct;
};
