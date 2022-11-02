const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Call route
const route = require('./routes');
// Call biến toàn cầu
require('dotenv').config();

const app = express();

// Khai báo Ejs
app.engine('.html', require('ejs').__express);

// Static file
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/images')));
app.set('views', path.join(__dirname, 'views'));

// Check folder static
console.log(`path: ${__dirname}`);

// Http Logger
app.use(morgan('combined'));
// Templating Engine
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
// Route chạy express
route(app);

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});
