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

	deleteProduct(id){
		const node={
			value:id
		};
		console.log("mayank");
		axios.post('http://localhost:4000/product/cancel/',node)
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