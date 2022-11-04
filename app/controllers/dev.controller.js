const Book = require('../models/dev.model');

exports.index = (req, res) => {
	Book.get_category((data) => {
		res.send({ result: data });
	});
	// return res.status(200).json({
	// 	message: 'OK',
	// 	data: data,
	// });
};
