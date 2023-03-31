'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ColorProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ColorProduct.hasOne(models.Product, { foreignKey: 'id_detail_prod' });
    }
  }
  ColorProduct.init(
    {
      product_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
      },
      color_id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'product_color',
      modelName: 'ColorProduct',
    }
  );
  return ColorProduct;
};
