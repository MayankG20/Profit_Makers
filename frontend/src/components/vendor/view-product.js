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
    <td>
      <button class="btn btn-danger" onClick={() => { props.deleteProduct(props.product._id)}}>delete</button>
    </td>
  </tr>
)

export default class ViewProducts extends Component {
	constructor(props){
		super(props);

		this.deleteProduct = this.deleteProduct.bind(this);
		this.productsList = this.productsList.bind(this);

		this.state= {
			products : []
		};
	}
	componentDidMount(){
		axios.get('http://localhost:4000/product/user/'+this.props.match.params.id)
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

	deleteProduct(id){
		const node={
			value:id
		};
		console.log("mayank");
		axios.post('http://localhost:4000/product/delete',node)
			.then(res=>console.log(res.data));

		this.setState({
			products: this.state.products.filter(pro => pro._id !==id)
		})
	}

	productsList(){
		return this.state.products.filter(pro => pro.status==="Not Dispatched").map(currentpro => {
			return <Products product={currentpro} deleteProduct={this.deleteProduct} key={currentpro._id}/>;
		})
	}

	render(){
		return (
			<div>
				<Vendor id={this.props.match.params.id}/>
			  <h3 style={{ fontFamily: "Courier New", color:"skyblue"}}>List of all Products</h3>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
			        <th>Price</th>
			        <th>Minimum-Quantity</th>
			        <th>Order</th>
			        <th>status</th>
			        <th>Cancel it</th>
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