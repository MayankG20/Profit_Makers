const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const Student = require('../../models/student');

router.route('/').get((req,res) => {

	Student.find()
		.then(students => res.json(students))
		.catch(err => res.status(400).json('Error: '+ err));

});

router.post("/add", (req,res) => {

	const { errors, isValid }=validateRegisterInput(req.body);

	console.log(req.body);
	console.log(errors,isValid)
	// isValid=isEmpty(errors) in register.js
	if(!isValid){
		return res.json(errors);
	}
	Student.find({ name: req.body.name }).then(user =>{
		console.log(user)
		if(user.length>0){
			return res.json({ Name: " Username already Taken "});
		}else{
			Student.find({ email: req.body.email }).then(user => {
				if(user.length>0){
					return res.json({ Email: "Email already Exists"});
				}
				else{
					const newStudent = new Student({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});
					console.log(newStudent);

					// Hash password before saving in database
					bcrypt.genSalt(10,(err,salt) => {
						bcrypt.hash(newStudent.password,salt,(err,hash) => {
							if(err) throw err;
							newStudent.password= hash;
							newStudent.save()
								.then(user => res.json(user))
								.catch(err => console.log(err));
						});
					});
				}
			});
		}
	});	
});


router.post("/exist",(req,res) =>{

	const { errors, isValid }= validateLoginInput(req.body);

	if(!isValid) {
		return res.json(errors);
	}

	const name = req.body.name;
	const password = req.body.password;

	Student.find({name: req.body.name}).then(user => {
		if(user.length==0) {
			return res.json({ usernotfound: "Studentname Not found"});
		}
		else{
		// console.log(count1)
			bcrypt.compare(password,user[0].password)
				.then(isMatch => {
					if(isMatch) {
						const payload = {
							id: user.id,
							name: user.name
						};
						count1=1
						// console.log(payload);
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
						return res.json({wrongpassword:"Password entered is wrong"})
					}
				})
				.catch(err=>res.status(400).json());
		}
	})
	.catch(err => res.status(400).json({Mayank: "Happy Birthday"}))
})

module.exports = router;