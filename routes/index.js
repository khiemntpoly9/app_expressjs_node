const siteRouter = require('./site');
const cat = require('./cat');

function route(app) {
	// Route
	app.use('/cat', cat);
	app.use('/', siteRouter);
}

module.exports = route;
