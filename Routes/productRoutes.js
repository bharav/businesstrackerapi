var express = require('express');

var routes = function (Product) {
	var productRouter = express.Router();

	productRouter.route('/Products')
		.post(function (req, res) {
			var supplier = new Product(req.body);
			supplier.save();
			res.status(201).send(supplier);

		})
		.get(function (req, res) {
			var query = {};
			if (req.query.name) {
				query.name = req.query.name
			}
			Product.find(query, function (err, products) {
				if (err)
					res.status(500).send(err);
				else
					res.json(products);
			})
		});
	productRouter.use('/Products/:productId', function (req, res, next) {
		Product.findById(req.params.productId, function (err, product) {
			if (err)
				res.status(500).send(err);
			else if (product) {
				req.supplier = product;
				next();
			}
			else {
				res.status(404).send('no order found');
			}

		})
	});
	productRouter.route('/Products/:productId')
		.get(function (req, res) {
			res.json(req.product);
		})
		.put(function (req, res) {
			req.product.name = req.body.name,
			req.product.instock = req.body.instock,
			req.product.outstock = req.body.outstock,
			req.product.batch = req.body.batch,
			req.product.currentCP = req.body.currentCP,
			req.product.currentSP = req.body.currentSP,
			req.product.category = req.body.category,
			req.product.comment = req.body.comment,
			req.product.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.product);
			})

		});
	return productRouter;
};

module.exports = routes;