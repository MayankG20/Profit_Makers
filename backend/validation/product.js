const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateProductInput(data) {
	let errors = {};

	if(isEmpty(data.name)){
		data.name = "";
	}

	if(isEmpty(data.price)){
		data.price = "";
	}

	if(isEmpty(data.quantity)){
		data.quantity = "";
	}
	
	if(Validator.isEmpty(data.name)){
		errors.name = "Name is Required!!";
	}

	if(Validator.isEmpty(data.price)){
		errors.price = "Price is Required";
	}

	if(Validator.isEmpty(data.quantity)){
		errors.quantity = "Quantity is Required";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};