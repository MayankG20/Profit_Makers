const mongoose = require('mongoose');
// const Schema = mongoose.Schema

let Vendor = new mongoose.Schema({
    name: {
        type: String,
        required: true
        // unique: true
    },
    email: {
        type: String,
        required: true
        // unique: true
    },
    password:{
    	type: String,
    	required: true
    },
    customers:{
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Vendor', Vendor);