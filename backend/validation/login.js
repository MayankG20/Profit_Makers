const Validator = require('validator');
const isEmpty  = require('is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	// if(isEmpty(data.name)){
	// 	data.name : "";
	// }
	if(isEmpty(data.name)){
		data.name = "";
	}
	if(isEmpty(data.password)){
		data.password = "";
	}

	if(Validator.isEmpty(data.name)){
		errors.name = "Username is required";
	}

	if(Validator.isEmpty(data.password)){
		errors.psswd1 = "Password field is required"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
