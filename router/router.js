const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cateController = require('../controllers/cateController');
const productController = require('../controllers/productController');
const mailController = require('../mail/mailApp');

const authToken = require('../middleware/authenticateToken');
// Áp dụng middleware để xác thực tính hợp lệ của token cho tất cả các tài nguyên bảo vệ
// router.use(authToken);

router.get('/', (req, res) => {
	res.send('Server đang chạy trên Port 3000!');
});

// Định nghĩa route Product
router.post('/product/create', productController.createProduct);
router.put('/product/update', productController.updateProduct);
router.delete('/product/del', productController.deleteProduct);
router.get('/products', productController.getAllProduct);
router.get('/product', productController.getProductById);
router.get('/product/catechild', productController.getProdByCateChildId);
router.get('/product/cate', productController.getProdByCateId);
router.get('/products-price', productController.filterProductPrice);
router.get('/search-product', productController.searchProduct);

// Định nghĩa route Category
router.post('/category/create', cateController.createCate);
router.get('/categorys', cateController.getAllCate);
router.get('/category', cateController.getCateById);
router.put('/category/update', cateController.updateCate);
router.delete('/category/del', cateController.deleteCate);

// Định nghĩa route User
router.post('/auth', authToken.authLogin);
router.post('/logout', authToken.authLogout);
// User, Role
router.get('/users', authToken.adminRole, userController.getAllUsers);
router.get('/user', userController.getUserById);
router.get('/listrole', userController.getRoleDetail);
router.post('/createuser', authToken.createUser);
router.post('/forgotpass', authToken.checkUser, userController.forgotpass);
router.post('/checkcode', userController.checkCodeForgot);
router.post('/changepassnew', userController.changeNewPass);
router.put('/updateuser', userController.updateUser);
router.put('/changepass', userController.changePassword);
router.put('/changerole', userController.changeRole);
router.delete('/deleteuser', userController.deleteUser);

// Test mail
router.get('/mail', mailController.createAccount);

module.exports = router;
