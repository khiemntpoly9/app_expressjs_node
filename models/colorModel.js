'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Colors.belongsToMany(models.Product, { through: models.ColorProduct, foreignKey: 'color_id' });
    }
  }
  Colors.init(
    {
      id_color: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      hex_color: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: 'colors',
      modelName: 'Colors',
    }
  );
  return Colors;
};
