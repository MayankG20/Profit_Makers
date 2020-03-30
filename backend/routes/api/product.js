const express = require('express');
const router = express.Router();

// let Vendor = require('../../models/vendor');
let Product = require('../../models/product');
const validateProductInput = require('../../validation/product');

router.route('/').get((req,res) => {

	Product.find()
		.then(products => res.json(products))
		.catch(err => res.status(400).json('Error: '+ err));

});

router.route('/vendor/:id').get((req,res) =>{
	
	Product.find({vendorname:req.params.id})
		.then(users => res.json(users))
});

router.route('/add').post((req,res) =>{

	console.log(req);
	console.log(req.body);

	const { errors, isValid }=validateProductInput(req.body);

	// isValid=isEmpty(errors) in register.js
	if(!isValid){
		return res.status(400).json(errors);
	}

	const product = new Product({
		vendorname: String(req.body._id),
		name: req.body.name,
		price: Number(req.body.price),
		quantity: Number(req.body.quantity),
		order: 0,
		status:'Not Dispatched',
		vendorname: req.body.vendorname,
		vrating: req.body.vrating,
		rating: 0,
		review: ''
	})

	console.log(product);
	product.save()
		.then(() => res.json('Product added!!!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/').post((req,res) =>{
	console.log(req.body);
	Product.findById(req.body.value)
	.then(product => {
		product.order += Number(req.body.order);
		if(product.order>=product.quantity)
			product.status='Ready';
		else{
			product.status='Not Dispatched';
		}
		console.log(product);
		product.save()
			.then(() => res.json(product.status))
			.catch(err=> res.status(400).json('Error: '+err));
	})
	.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/updatevrating/').post((req,res) =>{
	console.log(req.body);
	Product.updateMany({vendorname:req.body.name},{ $set : {vrating: req.body.rating}},{upsert: true},
		(err,doc) => {
			if(err) console.log(err);
			console.log(doc);
		}
	);
})

router.route('/cancel/').post((req,res) => {

	console.log(req.body.value);

	Product.findById(req.body.value)
		.then(product => {
			product.status='Cancelled';

			product.save()
				.then(() => res.json('Product Cancelled!'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/dispatch/').post((req,res) => {

	Product.findById(req.body.value)
		.then(product => {
			product.status="Dispatched";

			product.save()
				.then(() => res.json('Product Dispatched!'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/delete').post((req,res) =>{

	console.log(req.body.value);
	Product.deleteOne({_id:req.body.value})
		.then(() =>res.json('Product deleted.'))
		.catch(err =>res.status(400).json('Error: '+ err));
});

module.exports = router;