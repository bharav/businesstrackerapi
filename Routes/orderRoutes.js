var express = require('express');

var routes = function (Order,Product) {
	var orderRouter = express.Router();
	orderRouter.route('/Orders')
		.post(function (req, res) {
			var order = new Order(req.body);
			//update current products
			for (var i = 0; i < req.body.product.length; i++) {
				var currentunit =req.body.product[i].productunit;
				Product.findById(req.body.product[i].productid, function (err, product) {
					if (err)
						console.log(err);
					else {
						product.outstock += currentunit;
						product.save(function (err) {
							if (err)
								console.log("error while updating product outstock");
							else
								console.log("product updated successfully");
						})
					}
				})
			}
			order.save();
			res.status(201).send(order);

		})
		.get(function (req, res) {
			var query = {};
			if (req.query.custname) {
				query.custname = req.query.custname
			}
			else if (req.query.orderdate) {
				var date = new Date(req.query.orderdate);
				var todate = new Date(req.query.orderdate);
				todate.setDate(todate.getDate() + 1);
				query.orderdate = { $gte: date, $lt: todate };
			}
			Order.find(query, function (err, orders) {
				if (err)
					res.status(500).send(err);
				else
					res.json(orders);
			})
		});
	orderRouter.use('/Orders/:orderId', function (req, res, next) {
		Order.findById(req.params.orderId, function (err, order) {
			if (err)
				res.status(500).send(err);
			else if (order) {
				req.order = order;
				next();
			}
			else {
				res.status(404).send('no order found');
			}

		})
	});
	orderRouter.route('/Orders/:orderId')
		.get(function (req, res) {
			res.json(req.order);
		})
		.put(function (req, res) {
			req.order.product = req.body.product,
			req.order.paymentstatus = req.body.paymentstatus,
			req.order.paymenttype = req.body.paymenttype,
			req.order.paymentBank = req.body.paymentBank,
			req.order.paymentWallet = req.body.paymentWallet,
			req.order.paymentcomment = req.body.paymentcomment,
			req.order.orderstatus = req.body.orderstatus,
			req.order.ordershipping = req.body.ordershipping,
			req.order.orderstatuscomment = req.body.orderstatuscomment,
			req.order.totalamount = req.body.totalamount
			req.order.save(function (err) {
				if (err)
					res.status(500).send(err);
				else
					res.json(req.order);
			})

		});
	return orderRouter;
};

module.exports = routes;