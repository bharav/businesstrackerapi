/**
 * Created by vivek on 13-11-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var supplierModel = new Schema({
    name:{type:String},
    email:{type:String},
    address:{type:String},
    phone:{type:Number},
	uid:{type:String},
	status:{type:Boolean},
	comment:{type:String}
});

module.exports=mongoose.model('supplier',supplierModel);