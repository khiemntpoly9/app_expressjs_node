const mysql = require('mysql');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'labnodejs',
});

module.exports = conn;
