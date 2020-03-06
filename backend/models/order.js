const mongoose = require('mongoose');

let Order = new mongoose.Schema({
	pid:{
		type: String,
		required: true
	},
	pname:{
		type: String,
		required: true
	},
	vname: {
		type: String,
		required: true
	},
	sname: {
		type: String,
		required: true
	},
	qtyorder: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Order',Order);