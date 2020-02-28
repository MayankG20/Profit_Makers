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

router.route('/user/:id').get((req,res) =>{
	
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
		vendorname: req.body.vendorname
	})

	console.log(product);
	product.save()
		.then(() => res.json('Product added!!!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/').post((req,res) =>{

	Product.findById(req.body.doc_id)
	.then(product => {
		product.order = Number(req.body.value);
		if(product.order>=product.quantity)
			product.status='Dispatched';
		else{
			product.status='Not Dispatched';
		}

		product.save()
			.then(() => res.json('Product updated!'))
			.catch(err=> res.status(400).json('Error: '+err));
	})
	.catch(err => res.status(400).json('Error: '+ err));
})

router.route('/delete').post((req,res) =>{

	// console.log("mafjasd");
	// console.log(req);
	console.log(req.body.value);
	Product.deleteOne({_id:req.body.value})
		.then(() =>res.json('Product deleted.'))
		.catch(err =>res.status(400).json('Error: '+ err));
});

module.exports = router;