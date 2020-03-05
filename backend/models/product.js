const mongoose =require('mongoose');

let Product = new mongoose.Schema({
	vendorname:{
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	quantity:{
		type: Number,
		required: true
	},
	order:{
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	vrating: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
	},
	review: {
		type: String,
	}
})

module.exports = mongoose.model('Product',Product);