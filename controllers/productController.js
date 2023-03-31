const db = require('../models/index');
const { Product, Category, CategoryChild, Brand, ImgProduct, DetailProduct, Colors, ColorProduct } = db;
const Sequelize = require('sequelize');

const ProductController = {
  // Thêm sản phẩm
  createProduct: async (req, res) => {
    const {
      name_prod,
      cate_child_prod,
      brand_prod,
      id_detail_prod,
      price_prod,
      material_prod,
      img_prod,
      style_prod,
    } = req.body;
    try {
      const product = await Product.create({
        name_prod,
        cate_child_prod,
        brand_prod,
        id_detail_prod,
        price_prod,
        material_prod,
        img_prod,
        style_prod,
      });
      res.status(201).json({ message: 'Thêm sản phẩm thành công!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Sửa sản phẩm
  updateProduct: async (req, res) => {
    const { id } = req.query;
    const {
      name_prod,
      cate_child_prod,
      brand_prod,
      id_detail_prod,
      price_prod,
      material_prod,
      img_prod,
      style_prod,
    } = req.body;
    try {
      const numRows = await Product.update(
        // UpdateAt thêm thời gian lúc update
        {
          name_prod,
          cate_child_prod,
          brand_prod,
          id_detail_prod,
          price_prod,
          material_prod,
          img_prod,
          style_prod,
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        { returning: true, where: { id_product: id } }
      );
      // Hàm update trả về một mảng có một phần tử, là số lượng bản ghi đã được cập nhật.
      // Nếu số lượng bản ghi này bằng 0, có nghĩa là không tìm thấy người dùng có ID bằng id,
      // ta gửi trả về một mã lỗi 404 và thông báo "Category not found".
      if (numRows[0] === 0) {
        res.status(404).send({ message: 'Không tìm thấy sản phẩm' });
        return;
      }
      const updatedProduct = await Product.findByPk(id);
      res.json({ message: 'Sửa sản phẩm thành công!' });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  },
  // Xoá sản phẩm
  deleteProduct: async (req, res) => {
    const { id } = req.query;
    const id_product = id;
    try {
      const deletedRows = await Product.destroy({
        where: { id_product },
      });
      if (deletedRows === 0) {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm!' });
        return;
      }
      res.json({ message: 'Xoá sản phẩm thành công!' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Lấy tất cả sản phẩm
  getAllProduct: async (req, res) => {
    try {
      const products = await Product.findAll({
        // Trả về dữ liệu kiểm soát
        attributes: ['id_product', 'name_prod', 'price_prod', 'createdAt', 'updatedAt'],
        include: [
          {
            model: CategoryChild,
            attributes: ['id_category_child', 'name_category_child'],
            include: [
              {
                model: Category,
                attributes: ['id_category', 'name_category'],
              },
            ],
          },
          {
            model: Brand,
            attributes: ['name_brand'],
          },
          {
            model: ImgProduct,
            attributes: ['img_1', 'img_2', 'img_3', 'img_4'],
          },
          // Lấy thông tin sản phẩm
          {
            model: DetailProduct,
            attributes: ['detail_prod', 'description_prod', 'specification_prod', 'preserve_prod'],
          },
          // Lấy màu sản phẩm
          {
            model: Colors,
            through: ColorProduct,
            attributes: ['name_color', 'hex_color'],
          },
        ],
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
    const id_product = id;
    try {
      // Dùng phương thức Product.findByPk để tìm 'id' tương ứng
      const product = await Product.findByPk(id_product, {
        attributes: ['id_product', 'name_prod', 'price_prod', 'createdAt', 'updatedAt'],
        include: [
          {
            model: CategoryChild,
            attributes: ['id_category_child', 'name_category_child'],
            include: [
              {
                model: Category,
                attributes: ['id_category', 'name_category'],
              },
            ],
          },
          {
            model: Brand,
            attributes: ['name_brand'],
          },
          {
            model: ImgProduct,
            attributes: ['img_1', 'img_2', 'img_3', 'img_4'],
          },
          // Lấy thông tin sản phẩm
          {
            model: DetailProduct,
            attributes: ['detail_prod', 'description_prod', 'specification_prod', 'preserve_prod'],
          },
          // Lấy màu sản phẩm
          {
            model: Colors,
            through: ColorProduct,
            attributes: ['name_color', 'hex_color'],
          },
        ],
      });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Lấy danh sách sản phẩm theo danh mục con
  getProdByCateChildId: async (req, res) => {
    const { catechildid } = req.query;
    try {
      // Tìm danh sách sản phẩm có idCate tương ứng với idCate được truyền vào
      const products = await Product.findAll({
        where: {
          cate_child_prod: catechildid,
        },
      });
      if (products.length === 0) {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm ở danh mục này!' });
        return;
      }
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Lấy danh sách sản phẩm theo danh mục mẹ
  getProdByCateId: async (req, res) => {
    const { cateid } = req.query;
    try {
      const products = await Product.findAll({
        include: [
          {
            model: CategoryChild,
            attributes: ['id_category_child', 'name_category_child'],
            include: [
              {
                model: Category,
                // attributes: ['id_category', 'name_category'],
                where: {
                  id_category: cateid,
                },
              },
            ],
          },
        ],
      });
      if (products.length === 0) {
        res.status(404).json({ message: 'Không tìm thấy sản phẩm ở danh mục này!' });
        return;
      }
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = ProductController;
