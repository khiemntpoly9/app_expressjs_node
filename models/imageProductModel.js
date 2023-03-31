'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImagesProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ImagesProduct.belongsTo(models.Product, { foreignKey: 'img_prod' });
    }
  }
  ImagesProduct.init(
    {
      id_images: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      img_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      img_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      img_3: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      img_4: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'img_product',
      modelName: 'ImgProduct',
    }
  );
  return ImagesProduct;
};
