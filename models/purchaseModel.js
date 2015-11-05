/**
 * Created by vivek on 05-11-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var product = new Schema({
    productid:{type:String},
    productname:{type:String},
    productunit:{type:Number},
    productunitpurhaseprice:{type:Number}
});
var purchaseModel = new Schema({
    purchasedate:{type:Date, default:Date.now},
    suppliername:{type:String},
    supplieremail:{type:String},
    supplieraddress:{type:String},
    supplierphone:{type:Number},
    product:[product],
    ppaymentstatus:{type:Boolean, default:false},
    ppaymenttype:{type:String},
    ppaymentfrombank:{type:String},
    ppaymentcomment:{type:String},
    purchasestatus:{type:String},
    purchasetatuscomment:{type:String},
    purchasetotalamount:{type:Number}
});

module.exports=mongoose.model('Purchase',purchaseModel);
