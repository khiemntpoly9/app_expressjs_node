const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const cateController = require("./controllers/cateController");
const productController = require("./controllers/productController");

const authenticateToken = require("../middleware/authenticateToken");
// Áp dụng middleware để xác thực tính hợp lệ của token cho tất cả các tài nguyên bảo vệ
// router.use(authenticateToken);

// Định nghĩa route Product
router.post("/product/create", productController.createProduct);
router.put("/product/update", productController.updateProduct);
router.delete("/product/del", productController.deleteProduct);
router.get("/products", productController.getAllProduct);
router.get("/product", productController.getProductById);
router.get("/product/cate", productController.getProductsByCateId);

// Định nghĩa route Category
router.post("/category/create", cateController.createCate);
router.get("/categorys", cateController.getAllCate);
router.get("/category", cateController.getCateById);
router.put("/category/update", cateController.updateCate);
router.delete("/category/del", cateController.deleteCate);

// Định nghĩa route User
router.post("/auth", userController.authLogin);
router.get("/users", authenticateToken, userController.getAllUsers);
router.get("/users/:id", authenticateToken, userController.getUserById);
router.post("/createuser", userController.createUser);
router.put("/updateuser/:id", authenticateToken, userController.updateUser);
router.delete("/deleteuser/:id", authenticateToken, userController.deleteUser);

module.exports = router;
