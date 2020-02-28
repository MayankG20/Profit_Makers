import React, { Component } from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import Vendor from './vendornavbar.js';


export default class CreateProduct extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangePrice = this.onChangePrice.bind(this);
		this.onChangeQuantity = this.onChangeQuantity.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state={
			name: '',
			price: '',
			quantity: '',
			vendorname: ""
		};
		console.log(this.state);
	}

	onChangeName(e){
		this.setState({
			name: e.target.value
		});
	}

	onChangeQuantity(e){
		this.setState({
			quantity: e.target.value
		});
	}

	onChangePrice(e){
		this.setState({
			price: e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();

		// console.log(this.props.match.params.id);
		const product = {
			name: this.state.name,
			quantity: this.state.quantity,
			price: this.state.price,
			order: "0",
			status: "Not Dispatched",
			vendorname: this.props.match.params.id
		};

		console.log(product);
		axios.post('http://localhost:4000/product/add',product)
			.then(res => console.log(res.data))

		this.setState({
			name: "",
			price: "",
			quantity: "",
			vendorname: ""
		})

		window.location = "/vendor/"+this.props.match.params.id
		
	}

	render(){
		return (
			<div>
				<Vendor id={this.props.match.params.id}/>
				<h3 style={{fontFamily:"Courier New",color: "green"}}>Create New Product</h3>
					<form onSubmit={this.onSubmit}>
						<div className="form-group">
							<label>Name: </label>
							<input type="text"
								required
								className="form-control"
								value={this.state.name}
								onChange={this.onChangeName}
							/>
						</div>
						<div className="form-group">
							<label>Price: </label>
							<input type="text"
								required
								className="form-control"
								value={this.state.price}
								onChange={this.onChangePrice}
							/>
						</div>
						<div className="form-group">
							<label>Quantity: </label>
							<input type="text"
								required
								className="form-control"
								value={this.state.quantity}
								onChange={this.onChangeQuantity}
							/>
						</div>
						<div className="form-group">
							<input type="submit" value="Add Product" className="btn btn-primary" />
						</div>
					</form>
			</div>
		)
	}
}
