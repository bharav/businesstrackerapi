/**
 * Created by vivek on 19-10-2015.
 */
var express = require('express'),
    mongoose=require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://viv-mongolab:mongolab@2015@ds048368.mongolab.com:48368/businesstrackerapi');
var Order = require('./models/orderModel')

var app = express();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var orderRouter = express.Router();

orderRouter.route('/Orders')
    .post(function (req,res) {
        var order = new Order(req.body);
       order.save();
        res.status(201).send(order);

    })
    .get(function(req,res){
        Order.find(function (err,orders) {
            if(err)
                res.status(500).send(err);
            else
                res.json(orders);
        })
    });

app.use('/api', orderRouter);

app.get('/', function (req,res) {
    res.send('Welcome to business tracker api');
});

app.listen(port, function () {
    console.log('Gulp is running our app on PORT '+ port);
} )