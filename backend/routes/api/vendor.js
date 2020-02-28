const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const Vendor = require('../../models/vendor');

router.route('/').get((req,res) => {

	Vendor.find()
		.then(vendors => res.json(vendors))
		.catch(err => res.status(400).json('Error: '+ err));

});

router.post("/add", (req,res) => {

	const { errors, isValid }=validateRegisterInput(req.body);

	// isValid=isEmpty(errors) in register.js
	if(!isValid){
		return res.json(errors);
	}
	Vendor.find({ name: req.body.name }).then(user =>{
		if(user.length>0){
			return res.json({ Name: " Username already Taken "});
		}else{
			Vendor.find({ email: req.body.email }).then(user => {
				if(user.length>0){
					return res.json({ Email: "Email already Exists"});
				}
				else{
					const newVendor = new Vendor({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});
					console.log(newVendor);

					// Hash password before saving in database
					bcrypt.genSalt(10,(err,salt) => {
						bcrypt.hash(newVendor.password,salt,(err,hash) => {
							if(err) throw err;
							newVendor.password= hash;
							newVendor.save()
								.then(user => res.json(user))
								.catch(err => console.log('Error: '+err));
						});
					});
				}
			});
		}
	});	
});


router.post("/exist",(req,res) =>{

	const { errors, isValid }= validateLoginInput(req.body);

	// console.log(errors);
	// console.log(isValid);

	if(!isValid) {
		return res.json(errors);
	}

	else{

		const name = req.body.name;
		const password = req.body.password;

		Vendor.find({name:req.body.name})
			.then(user => {
				// console.log(user.length);
				if(user.length>0){
					bcrypt.compare(password,user[0].password)
						.then(isMatch => {
							if(isMatch){
								const payload = {
									id: user.id,
									name: user.name
								};
								jwt.sign(
									payload,
									keys.secretOrKey,
									{
										expiresIn: 6*30*60*60
										// 6 months
									},
									(err,token) => {
										res.json({
											success: true,
											token: "Bearer " + token
										});
									}
								);
							}
							else{
								return res.json({ wrongpassword:"Password Wrong" })
							}
						})
						.catch(err=>res.status(400).json());
					}
					else
						return res.json({ usernotfound: "Vendorname doesn't exist"});
			})
			.catch(err => res.status(400).json({Mayank: "Happy Birthday"}))

	}
})

module.exports = router;