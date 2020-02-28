const Validator = require('validator');
const isEmpty  = require('is-empty');

module.exports = function validateRegisterInput(data) {
	let errors = {};

	console.log(data);
	// console.log("fsdafsd");
	if(isEmpty(data.name)){
		data.name = "";
	}
	if(isEmpty(data.email)){
		data.email = "";
	}
	if(isEmpty(data.password)){
		data.password= "";
	}
	if(isEmpty(data.password2)){
		data.password2= "";
	}

	if(Validator.isEmpty(data.name)){
		errors.name="Name field is required";
	}

	if(Validator.isEmpty(data.email)){
		errors.email = "Email field is required";
	}
	else if(!Validator.isEmail(data.email)){
		errors.email = "Email is invalid";
	}

	if(Validator.isEmpty(data.password)){
		errors.psswd = "Password field is required"
	}

	if(Validator.isEmpty(data.password2)){
		errors.psswd2 = "Password field is required"
	}

	if(!Validator.isLength(data.password, {min: 8, max:25})){
		errors.psswd1 = "Password Length must be between 8 and 25";
	}

	if(!Validator.equals(data.password, data.password2)){
		errors.psswd2 = "Passwords must be same"
	}

	console.log(errors);
	return {
		errors,
		isValid: isEmpty(errors)
	};
};
