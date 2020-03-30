const express = require('express');
const router = express.Router();

let Order = require('../../models/order');

router.route('/').get((req,res) => {

	Order.find()
		.then(orders => res.json(orders))
		.catch(err => res.status(400).json('Error: '+ err));

})

router.route('/student/:id').get((req,res) => {

	Order.find({sname:req.params.id})
		.then(order => res.json(order))

});

router.route('/add').post((req,res) => {

	console.log(req.body);

	const order = new Order({
		pid: String(req.body.pid),
		pname: req.body.pname,
		sname: req.body.sname,
		vname: req.body.vname,
		qtyorder: Number(req.body.order),
		status: String(req.body.status)
	})

	console.log(order);
	order.save()
		.then(() => res.json('Order Placed!!'))
		.catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/quantity').post((req,res) => {

	Order.findById(req.body.value)
		.then(order => {
			order.qtyorder = Number(req.body.order);

			order.save()
				.then(() => res.json('Order Qty Updated!!'))
				.catch(err => res.status(400).json('Error: '+err));
		})
		.catch(err => res.status(400).json('Error: '+err));
})

router.route('/update/status').post((req,res) => {
	console.log(req.body);
	Order.updateMany({pid:req.body.pid},{ $set: {status: req.body.status }},{upsert: true},
		(err,doc) => {
			if(err) console.log(err);
			console.log(doc);
		});

})

module.exports = router;