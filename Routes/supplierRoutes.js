var express = require('express');

var routes = function (Supplier) {
	var supplierRouter = express.Router();

	supplierRouter.route('/Suppliers')
		.post(function (req, res) {
			var supplier = new Supplier(req.body);
			supplier.save();
			res.status(201).send(supplier);

		})
		.get(function (req, res) {
			var query = {};
			if (req.query.name) {
				query.name = req.query.name
			}
			Supplier.find(query, function (err, customers) {
				if (err)
					res.status(500).send(err);
				else
					res.json(customers);
			})
		});
	supplierRouter.use('/Suppliers/:supplierId', function (req, res, next) {
	Supplier.findById(req.params.supplierId, function (err, supplier) {
			if (err)
				res.status(500).send(err);
			else if (supplier) {
				req.supplier = supplier;
				next();
			}
			else {
				res.status(404).send('no order found');
			}

		})
	});
	supplierRouter.route('/Suppliers/:supplierId')
		.get(function (req, res) {
			res.json(req.supplier);
		})
		.put(function (req, res) {
				req.supplier.name = req.body.name,
				req.supplier.email = req.body.email,
				req.supplier.address = req.body.address,
				req.supplier.phone = req.body.phone,
				req.supplier.comment = req.body.comment
				req.supplier.status=req.body.status,
				req.supplier.uid=req.supplier.uid
				req.supplier.save(function (err) {
					if (err)
						res.status(500).send(err);
					else
						res.json(req.supplier);
				})
				
		});
	return supplierRouter;
};

module.exports = routes;