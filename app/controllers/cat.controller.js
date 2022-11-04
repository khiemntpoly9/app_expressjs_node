const catBook = require('../models/site.model');

exports.index = (req, res) => {
	catBook.catBook((data) => {
		// console.log(data);
		res.render('home', { title: 'Trang chủ', catSach: data });
	});
};
