/* eslint-disable no-undef */
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();

export default {
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	host: process.env.DB_HOST,
	dialect: 'mysql',
	freezeTableName: true,
	// Ẩn câu lệnh Query
	logging: false,
	timezone: '+07:00',
};
