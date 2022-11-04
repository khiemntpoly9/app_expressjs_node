const catBook = require('../models/site.model');

// Get category
exports.index = (req, res) => {
	catBook.cat((data) => {
		return data;
	});
	res.render('home', { catSach: `${data}` });
};

// exports.catSach = (req, res) => {
// 	const data = catBook.listBookId(req.params.cateId);
// 	res.render('home', { dataCat: data });
// };
