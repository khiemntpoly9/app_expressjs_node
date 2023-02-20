const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

// Category Model
const Category = sequelize.define(
  'category',
  {
    idCate: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nameCate: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    urlCate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // đặt freezeTableName là true
  }
);

// Product Model
const Product = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idCateProduct: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: Category,
        key: 'idCate',
      },
    },
    nameProduct: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    priceProduct: {
      type: DataTypes.DECIMAL(10, 0),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true, // đặt freezeTableName là true
  }
);

// Product.belongsTo(Category);
Product.belongsTo(Category, { foreignKey: 'idCateProduct' });
Category.hasMany(Product, { foreignKey: 'idCateProduct' });

module.exports = { Category, Product };
