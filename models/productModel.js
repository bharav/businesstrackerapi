/**
 * Created by vivek on 13-11-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productModel = new Schema({
    name: { type: String },
    instock: { type: Number },
	outstock: { type: Number },
	batch: { type: String },
    currentCP: { type: Number },
	currentSP: { type: Number },
	category: { type: Boolean },
	comment: { type: String }
});

module.exports = mongoose.model('product', productModel);