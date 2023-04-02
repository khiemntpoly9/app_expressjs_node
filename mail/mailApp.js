/* eslint-disable no-undef */
// Nodemail
const nodemailer = require('nodemailer');
// Handlebars
const hbs = require('nodemailer-express-handlebars');
// .ENV
require('dotenv').config();

// Cấu hình vẫn chuyển
let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL, // generated ethereal user
		pass: process.env.PASSWORD, // generated ethereal password
	},
});

//
let options = {
	viewEngine: {
		extName: '.hbs',
		partialsDir: 'mail/template',
		layoutsDir: 'mail/template',
		defaultLayout: '',
	},
	viewPath: 'mail/template',
	extName: '.hbs',
};

transporter.use('compile', hbs(options));

const mailApp = {
	// Mail thông báo tạo tài khoản
	createAccount: async (lastName, email) => {
		try {
			const mail = {
				from: '"Ant Home Poly" <anthomepoly@gmail.com>',
				to: email,
				subject: 'Tạo tài khoản thành công!',
				template: 'createaccount',
				context: {
					lastName: lastName,
					email: email,
				},
			};
			let info = await transporter.sendMail(mail);
			console.log('Gửi mail thành công!');
		} catch (error) {
			console.log(error);
		}
	},
	// Mail khôi phục mật khẩu
	forgotpass: async (number, email) => {
		try {
			const mail = {
				from: '"Ant Home Poly" <anthomepoly@gmail.com>',
				to: email,
				subject: 'Khôi phục mật khẩu!',
				template: 'forgotpass',
				context: {
					number: number,
				},
			};
			let info = await transporter.sendMail(mail);
			console.log('Gửi mail thành công!');
		} catch (error) {
			console.log(error);
		}
	},
};

module.exports = mailApp;
