const siteRouter = require('./site.router');
const cat = require('./cat.router');
const devTest = require('./dev.router');

let initwebRoutes = (app) => {
	app.use('/dev', devTest);
	app.use('/cat', cat);
	app.use('/', siteRouter);
};
module.exports = initwebRoutes;
