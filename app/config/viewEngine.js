const express = require('express');
const path = require('path');

let configViewEngine = (app) => {
	app.engine('.html', require('ejs').__express);
	app.use(express.static(path.join(__dirname, '../../public/css')));
	app.use(express.static(path.join(__dirname, '../../public/dist/js')));
	app.use(express.static(path.join(__dirname, '../../public/images')));
	app.set('views', path.join(__dirname, '../../public'));

	// Templating Engine
	app.set('view engine', 'html');
	// console.log(`path: ${__dirname}`);
};

module.exports = configViewEngine;
