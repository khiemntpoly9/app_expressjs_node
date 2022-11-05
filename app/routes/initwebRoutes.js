const apiApp = require('./api.router');
const siteRouter = require('./site.router');
const devTest = require('./dev.router');

let initwebRoutes = (app) => {
	// Api
	app.use('/api', apiApp);
	app.use('/dev', devTest);
	// Category
	app.use('/cat', (req, res) => {
		const id = req.query.id;
		res.render('index', { title: 'Home' });
	});
	// Home
	app.use('/', siteRouter);
	// Page 404
	app.use((req, res, next) => {
		res.status(404);
		res.format({
			html: function () {
				res.render('404', { url: req.url });
			},
			json: function () {
				res.json({ error: 'Not found' });
			},
			default: function () {
				res.type('txt').send('Not found');
			},
		});
	});
};
module.exports = initwebRoutes;
