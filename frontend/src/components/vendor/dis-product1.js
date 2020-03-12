import React, {Component} from 'react';
import { Link ,BrowserRouter as Router} from 'react-router-dom';
import axios from 'axios';
import Vendor from './vendornavbar';


const Products = props => (
  <tr>
    <td>{props.product.name}</td>
    <td>{props.product.price}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.order}</td>
    <td>{props.product.status}</td>
  </tr>
)

export default class ViewProducts extends Component {
	constructor(props){
		super(props);

		this.productsList = this.productsList.bind(this);

		this.state= {
			products : []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:4000/product/vendor/'+this.props.match.params.id)
			.then(res => {
				console.log(res.data);
				this.setState({
					products: res.data
				});
			})
			.catch(err => {
				console.log(err);
			})
			console.log(this.state.products);
	}

	productsList(){
		return this.state.products.filter(pro => pro.status==="Dispatched").map(currentpro => {
			return <Products product={currentpro} key={currentpro._id}/>;
		})
	}

	render(){
		return (
			<div>
				<div style={{width:"100%",height:"2vh"}}></div>

			  <h3 style={{ fontFamily: "monospace", color:"skyblue"}}>List of all Products</h3>
				<div style={{width:"100%",height:"3vh"}}></div>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
			        <th>Price</th>
			        <th>Minimum-Quantity</th>
			        <th>Order</th>
			        <th>status</th>
			      </tr>
			    </thead>
			    <tbody>
			      { this.productsList() }
			    </tbody>
			  </table>
			</div>
		);
	}
}