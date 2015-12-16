/**
 * Created by vivek on 13-11-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var customerModel = new Schema({
    name:{type:String},
    email:{type:String},
    address1:{type:String},
    address2:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    pincode:{type:Number},
    phone:{type:Number},
    mobile:{type:Number},
	comment:{type:String}
});

module.exports=mongoose.model('Customer',customerModel);