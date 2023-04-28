/* eslint-disable no-undef */
// Nodemail
import nodemailer from 'nodemailer';
// Handlebars
import hbs from 'nodemailer-express-handlebars';
import * as dotenv from 'dotenv';
// .ENV
dotenv.config();

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
		partialsDir: 'src/mail/template',
		layoutsDir: 'src/mail/template',
		defaultLayout: '',
	},
	viewPath: 'src/mail/template',
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

export default mailApp;
