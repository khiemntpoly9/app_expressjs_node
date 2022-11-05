const Book = require('../models/api.model');

exports.category = (req, res) => {
	Book.get_category((data) => {
		res.send({ result: data });
	});
};

exports.category_id = (req, res) => {
	Book.get_category_id(req.params.cateId, (data) => {
		res.send({ result: data });
	});
};

exports.getAllBook = (req, res) => {
	Book.get_all_book((data) => {
		res.send({ result: data });
	});
};
