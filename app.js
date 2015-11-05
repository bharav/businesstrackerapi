/**
 * Created by vivek on 19-10-2015.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/businesstrackerApi');
var Order = require('./models/orderModel')
var Purchase = require('./models/purchaseModel')

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var orderRouter = require('./Routes/orderRoutes')(Order);
var purchaseRouter = require('./Routes/purchaseRoutes')(Purchase);
app.use('/api', orderRouter);
app.use('/api',purchaseRouter)
app.get('/', function (req, res) {
    res.send('Welcome to business tracker api');
});

app.listen(port, function () {
    console.log('Gulp is running our app on PORT ' + port);
})