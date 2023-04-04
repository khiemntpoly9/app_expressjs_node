/* eslint-disable no-undef */
const db = require('../models/index');
const { User, Role } = db;
const jwt = require('jsonwebtoken');
// Mail app
const mailApp = require('../mail/mailApp');
//
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

// .ENV
require('dotenv').config();
// Sử dụng biến môi trường JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const getForUserToken = {
	getInfoUser: async (req, res, next) => {
		// Lấy Token
		const token = req.cookies.access_token;
		if (!token) {
			return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
		}
		try {
			const decoded = jwt.verify(token, JWT_SECRET);
			req.user = decoded;
			next();
		} catch (error) {
			return res.status(403).json({ message: 'Lỗi xác thực token!' });
		}
	},
};

module.exports = getForUserToken;
