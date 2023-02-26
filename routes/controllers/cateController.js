// import model Category vào file  userController
const { Category } = require("../../models/dbModel");
const Sequelize = require("sequelize");

const CateController = {
    // Thêm Category
    createCate: async (req, res) => {
        const { nameCate, urlCate } = req.body;
        try {
            const category = await Category.create({ nameCate, urlCate });
            res.status(201).send("Tạo danh mục thành công!");
            // res.status(201).json(category);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    // Sửa thông tin Category
    updateCate: async (req, res) => {
        const { idcate } = req.query;
        const { nameCate, urlCate } = req.body;
        try {
            const numRows = await Category.update(
                // UpdateAt thêm thời gian lúc update
                { nameCate, urlCate, updatedAt: Sequelize.literal("CURRENT_TIMESTAMP") },
                { returning: true, where: { idcate } }
            );
            // Hàm update trả về một mảng có một phần tử, là số lượng bản ghi đã được cập nhật.
            // Nếu số lượng bản ghi này bằng 0, có nghĩa là không tìm thấy người dùng có ID bằng id,
            // ta gửi trả về một mã lỗi 404 và thông báo "Category not found".
            if (numRows[0] === 0) {
                res.status(404).send("Category not found");
                return;
            }
            const updatedCate = await Category.findByPk(idcate);
            res.send(updatedCate);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    // Xoá Category
    deleteCate: async (req, res) => {
        const { idcate } = req.query;
        try {
            const deletedRows = await Category.destroy({
                where: { idcate },
            });
            if (deletedRows === 0) {
                res.status(404).send("Không tìm thấy danh mục!");
                return;
            }
            res.status(200).send("Xoá danh mục thành công!");
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    // Lấy tất cả Category
    getAllCate: async (req, res) => {
        try {
            const categoris = await Category.findAll();
            res.status(200).json(categoris);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    // Lấy thông tin Category theo ID
    getCateById: async (req, res) => {
        const { idcate } = req.query;
        try {
            // Dùng phương thức User.findByPk để tìm 'id' tương ứng
            const category = await Category.findByPk(idcate);
            if (!category) {
                res.status(404).send("Category not found");
                return;
            }
            res.status(200).json(category);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
};

module.exports = CateController;
