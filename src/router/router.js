/* eslint-disable import/namespace */
import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';
import cateController from '../controllers/cateController.js';
import productController from '../controllers/productController.js';
import brandController from '../controllers/brandController.js';
import authController from '../controllers/authController.js';
import favoritesController from '../controllers/favoritesController.js';
import mailController from '../mail/mailApp.js';

// Middleware
import authToken from '../middleware/authenticateToken.js';
// Áp dụng middleware để xác thực tính hợp lệ của token cho tất cả các tài nguyên bảo vệ
// router.use(authToken);

router.get('/', (req, res) => {
	res.send('Server đang chạy trên Port 3000!');
});

// Định nghĩa route Product
router.post('/product/create', authToken.manageRole, productController.createProduct);
router.put('/product/update', authToken.manageRole, productController.updateProduct);
router.delete('/product/del', authToken.manageRole, productController.deleteProduct);
router.get('/products', productController.getAllProduct);
router.get('/product', productController.getProductById);
router.get('/product/cate', productController.getProdByCateId);
router.get('/products-price', productController.filterProductPrice);
router.get('/search-product', productController.searchProduct);

// Định nghĩa route Category
router.post('/categories/create', cateController.createCate);
router.get('/categories/all', cateController.getAllCate);
router.get('/categories/parent', cateController.getParentCate);
router.get('/categories/chill', cateController.getCateById);
router.put('/categories/update', cateController.updateCate);
router.delete('/categories/del', cateController.deleteCate);

// Định nghĩa route User
router.post('/register', authController.authRegister);
router.post('/login', authController.authLogin);
router.post('/logout', authController.authLogout);
// User, Role
router.get('/users', authToken.adminRole, userController.getAllUsers);
router.get('/user', authToken.checkLogin, userController.getUserById);
router.get('/user-manage', userController.getUserByIdManage);
router.get('/listrole', userController.getRoleDetail);
router.post('/forgotpass', authToken.checkUser, userController.forgotpass);
router.post('/checkcode', userController.checkCodeForgot);
router.post('/changepassnew', userController.changeNewPass);
router.put('/updateuser', userController.updateUser);
router.put('/changepass', userController.changePassword);
router.put('/changerole', authToken.adminRole, userController.changeRole);
router.delete('/deleteuser', userController.deleteUser);
// Brand
router.get('/brands', brandController.getAllBrand);
// Favorite
router.post('/addfavorite', authToken.checkLogin, favoritesController.addFavorite);
router.delete('/delfavorite', authToken.checkLogin, favoritesController.delFavorite);
router.get('/allfavorite', authToken.checkLogin, favoritesController.getAllFavorite);

// Test mail
router.get('/mail', mailController.createAccount);

// Cart
router.post('/add-cart', authToken.isLogin, (req, res) => {
	const isLogin = req.isLogin;
	res.send({ mess: isLogin });
});

export default router;
