const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'labnodejs',
});

module.exports = db;
