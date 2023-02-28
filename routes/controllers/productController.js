// import model Product vào file  userController
const { Product, Category } = require('../../models/dbModel');
// const Category = require('../../models/cateModel');
const Sequelize = require('sequelize');

const ProductController = {
  // Thêm sản phẩm
  createProduct: async (req, res) => {
    const { idCateProduct, nameProduct, priceProduct, description, image_url } = req.body;
    try {
      const product = await Product.create({
        idCateProduct,
        nameProduct,
        priceProduct,
        description,
        image_url,
      });
      // res.status(201).json(product);
      res.status(201).send('Thêm sản phẩm thành công!');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Sửa sản phẩm
  updateProduct: async (req, res) => {
    const { id } = req.query;
    const { idCateProduct, nameProduct, priceProduct, description, image_url } = req.body;
    try {
      const numRows = await Product.update(
        // UpdateAt thêm thời gian lúc update
        {
          idCateProduct,
          nameProduct,
          priceProduct,
          description,
          image_url,
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        { returning: true, where: { id } }
      );
      // Hàm update trả về một mảng có một phần tử, là số lượng bản ghi đã được cập nhật.
      // Nếu số lượng bản ghi này bằng 0, có nghĩa là không tìm thấy người dùng có ID bằng id,
      // ta gửi trả về một mã lỗi 404 và thông báo "Category not found".
      if (numRows[0] === 0) {
        res.status(404).send('Product not found');
        return;
      }
      const updatedProduct = await Product.findByPk(id);
      res.send(updatedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Xoá sản phẩm
  deleteProduct: async (req, res) => {
    const { id } = req.query;
    try {
      const deletedRows = await Product.destroy({
        where: { id },
      });
      if (deletedRows === 0) {
        res.status(404).send('Product not found');
        return;
      }
      res.send('Product deleted successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Lấy tất cả sản phẩm
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: {
          model: Category,
          attributes: ['nameCate'],
        },
        order: [['createdAt', 'DESC']],
        // limit: 5
      });
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Lấy thông tin Product theo ID
  getProductById: async (req, res) => {
    const { id } = req.query;
    try {
      // Dùng phương thức Product.findByPk để tìm 'id' tương ứng
      const product = await Product.findByPk(id, {
        include: {
          model: Category,
          attributes: ['nameCate'],
        },
      });
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Lấy danh sách sản phẩm theo idCate
  getProductsByCateId: async (req, res) => {
    const { cateid } = req.query;
    try {
      // Tìm danh sách sản phẩm có idCate tương ứng với idCate được truyền vào
      const products = await Product.findAll({
        where: {
          idCateProduct: cateid,
        },
      });
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = ProductController;
