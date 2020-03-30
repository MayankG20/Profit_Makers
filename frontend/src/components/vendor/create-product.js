import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
			vendorname: "",
			vrating: 0,
			vendors:[]
		};
		console.log(this.state);
	}

	componentDidMount(){
		axios.get('http://localhost:4000/vendor/')
			.then(res => {
				this.setState({
					vendors: res.data
				})
				// console.log(this.state.vendors);
			})
			.catch(err => console.log(err));
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

		var i=0;
		var x=0;
		var y=0;
		for(i=0;i<(this.state.vendors.length);i++){
			const nm=this.state.vendors[i].name;
			const nm1=this.props.match.params.id;
			const vend = this.state.vendors[i];
			console.log(nm,nm1);
			if(nm===nm1){
				if(Number(vend.customers)>0){
					x=vend.customers/vend.rating;
					y=Math.round(x*10)/10
					this.setState({
						vrating:(vend.rating/vend.customers)
					})
				}
				// console.log(this.state.vrating);
			}
		}
		console.log(this.state.vrating);
		// console.log(this.props.match.params.id);
		const product = {
			name: this.state.name,
			quantity: this.state.quantity,
			price: this.state.price,
			order: "0",
			status: "Not Dispatched",
			vrating: y,
			vendorname: this.props.match.params.id
		};
		// var vendors={}
		// console.log(this.state.vendors);

		console.log(product);
		axios.post('http://localhost:4000/product/add',product)
			.then(res => console.log(res.data))
			.catch(err =>console.log(err));

		this.setState({
			name: "",
			price: "",
			quantity: "",
			vendorname: "",
			vrating:0
		})

		// window.location = "/vendor/"+this.props.match.params.id
		
	}

	render(){
		return (
			<div>
				<nav style={{ lineWidth:"1500px"}}>
				<div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", alignItems: "center",flexWrap: "Wrap" }}>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.props.match.params.id+"/create"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Create
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.props.match.params.id+"/view"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							View
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.props.match.params.id+"/ready"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Ready
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.props.match.params.id+"/dispatched"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Dispatched
						</Link>
					</div>
				</div>
			</nav>
				<div style={{width:"100%",height:"2vh"}}></div>
				<h3 style={{fontFamily:"monospace",color: "green"}}>Create New Product</h3>
				<div style={{width:"100%",height:"3vh"}}></div>
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
