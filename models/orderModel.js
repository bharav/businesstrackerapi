/**
 * Created by vivek on 19-10-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var product = new Schema({
    productid:{type:String},
    productname:{type:String},
    productunit:{type:Number},
    productunitprice:{type:Number}
});
var orderModel = new Schema({
    orderdate:{type:Date, default:Date.now},
    custname:{type:String},
    custemail:{type:String},
    custaddress:{type:String},
    custphone:{type:Number},
    product:[product],
    paymentstatus:{type:Boolean, default:false},
    paymenttype:{type:String},
    paymentBank:{type:String},
    paymentWallet:{type:String},
    paymentcomment:{type:String},
    orderstatus:{type:String},
    ordershipping:{type:String},
    orderstatuscomment:{type:String},
    totalamount:{type:Number}
});

module.exports=mongoose.model('Order',orderModel);
