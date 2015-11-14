var express = require('express');

var routes = function (Customer) {
	var customerRouter = express.Router();

	customerRouter.route('/Customers')
		.post(function (req, res) {
			var customer = new Customer(req.body);
			customer.save();
			res.status(201).send(customer);

		})
		.get(function (req, res) {
			var query = {};
			if (req.query.name) {
				query.name = req.query.name
			}
			Customer.find(query, function (err, customers) {
				if (err)
					res.status(500).send(err);
				else
					res.json(customers);
			})
		});
	customerRouter.use('/Customers/:custId', function (req, res, next) {
		Customer.findById(req.params.custId, function (err, customer) {
			if (err)
				res.status(500).send(err);
			else if (customer) {
				req.customer = customer;
				next();
			}
			else {
				res.status(404).send('no order found');
			}

		})
	});
	customerRouter.route('/Customers/:custId')
		.get(function (req, res) {
			res.json(req.customer);
		})
		.put(function (req, res) {
			req.customer.name = req.body.name,
			req.customer.email = req.body.email,
			req.customer.address = req.body.address,
			req.customer.phone = req.body.phone,
			req.customer.comment = req.body.comment
			req.customer.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.customer);
			})

		});
	return customerRouter;
};

module.exports = routes;