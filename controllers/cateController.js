const db = require('../models/index');
const { Product, Category, CategoryChild } = db;
const Sequelize = require('sequelize');

const CateController = {
  // Thêm Category
  createCate: async (req, res) => {
    const { name_category } = req.body;
    try {
      const category = await Category.create({ name_category });
      res.status(201).json({ message: 'Tạo danh mục thành công!' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Sửa thông tin Category
  updateCate: async (req, res) => {
    const { idcate } = req.query;
    const { name_category } = req.body;
    try {
      const numRows = await Category.update(
        // UpdateAt thêm thời gian lúc update
        { name_category, updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') },
        { returning: true, where: { id_category: idcate } }
      );
      if (numRows[0] === 0) {
        res.status(404).json({ message: 'Khômg tìm thấy danh mục!' });
        return;
      }
      const updatedCate = await Category.findByPk(idcate);
      res.json({ message: 'Sửa danh mục thành công!' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Xoá Category
  deleteCate: async (req, res) => {
    const { idcate } = req.query;
    try {
      const deletedRows = await Category.destroy({
        where: { id_category: idcate },
      });
      if (deletedRows === 0) {
        res.status(404).json({ message: 'Không tìm thấy danh mục!' });
        return;
      }
      res.status(200).send('Xoá danh mục thành công!');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Lấy tất cả Category
  getAllCate: async (req, res) => {
    try {
      const categoris = await Category.findAll({
        include: [
          {
            model: CategoryChild,
            attributes: ['id_category_child', 'name_category_child'],
          },
        ],
      });
      res.status(200).json(categoris);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Lấy thông tin Category theo ID
  getCateById: async (req, res) => {
    // Param
    const { idcate } = req.query;
    try {
      // Dùng phương thức User.findByPk để tìm 'id' tương ứng
      const category = await Category.findByPk(idcate, {
        include: [
          {
            model: CategoryChild,
            attributes: ['id_category_child', 'name_category_child'],
          },
        ],
      });
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = CateController;
