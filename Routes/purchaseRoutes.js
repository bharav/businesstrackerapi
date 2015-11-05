var express = require('express');

var routes = function (Purchase) {
	var purchaseRouter = express.Router();

	purchaseRouter.route('/Purchases')
		.post(function (req, res) {
			var purchase = new Purchase(req.body);
			purchase.save();
			res.status(201).send(purchase);

		})
		.get(function (req, res) {
			var query = {};
			if (req.query.suppliername) {
				query.suppliername = req.query.suppliername
			}
			else if (req.query.purchasedate) {
				var date = new Date(req.query.purchasedate);
				var todate = new Date(req.query.purchasedate);
				todate.setDate(todate.getDate()+1);
				query.purchasedate = {$gte:date,$lt:todate};
			}
			Purchase.find(query, function (err, purchases) {
				if (err)
					res.status(500).send(err);
				else
					res.json(purchases);
			})
		});
	purchaseRouter.use('/Purchases/:purchaseId', function (req, res, next) {
		Purchase.findById(req.params.purchaseId, function (err, purchase) {
			if (err)
				res.status(500).send(err);
			else if (purchase) {
				req.purchase = purchase;
				next();
			}
			else {
				res.status(404).send('no order found');
			}

		})
	});
	purchaseRouter.route('/Purchases/:purchaseId')
		.get(function (req, res) {
			res.json(req.purchase);
		})
		.put(function (req, res) {
				req.order.suppliername = req.body.suppliername	,
				req.order.supplieremail = req.body.supplieremail,
				req.order.supplieraddress = req.body.supplieraddress,
				req.order.supplierphone = req.body.supplierphone,
				req.order.product = req.body.product,
				req.order.ppaymentstatus = req.body.ppaymentstatus,
				req.order.ppaymenttype = req.body.ppaymenttype,
				req.order.ppaymentfrombank = req.body.ppaymentfrombank,
				req.order.ppaymentcomment = req.body.ppaymentcomment,
				req.order.purchasestatus = req.body.purchasestatus,
				req.order.purchasetatuscomment = req.body.purchasetatuscomment,
				req.order.purchasetotalamount = req.body.purchasetotalamount,
				req.order.save(function (err) {
					if (err)
						res.status(500).send(err);
					else
						res.json(req.purchase);
				})
				
		});
	return purchaseRouter;
};

module.exports = routes;