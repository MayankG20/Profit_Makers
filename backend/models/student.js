const mongoose = require('mongoose');
// const Schema = mongoose.Schema

let Student = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('Student', Student);