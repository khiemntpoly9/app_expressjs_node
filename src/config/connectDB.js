/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;

// asm-angular
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	host: DB_HOST,
	dialect: 'mysql',
	// Đặt tên bản đúng với Cấu trúc
	// freezeTableName: true
	// Ẩn lệnh Query
	logging: false,
	timezone: '+07:00',
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log(`Connection has been established successfully! PORT: ${process.env.PORT}`);
	} catch (error) {
		console.error('Unable to connect to the database: ', error);
	}
};

export default connectDB;
