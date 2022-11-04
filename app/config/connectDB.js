const mysql = require('mysql2');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'labnodejs',
});

db.connect((err) => {
	if (err) throw err;
	console.log('Connected DB!!!');
});

module.exports = db;
