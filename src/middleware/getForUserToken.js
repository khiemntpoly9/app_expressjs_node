/* eslint-disable no-undef */
import db from '../models/index.js';
const { User, Role } = db;
import jwt from 'jsonwebtoken';
// Mail app
import mailApp from '../mail/mailApp.js';
//
import bcryptjs from 'bcryptjs';
const saltRounds = 10;

import * as dotenv from 'dotenv';
// .ENV
dotenv.config();
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

export default getForUserToken;
