import React, {Component} from 'react';
import { Link ,BrowserRouter as Router,Route} from 'react-router-dom';
import axios from 'axios';
// import Vendor from './vendornavbar';
import Place from './place-order1';
import viewOrders from './view-order1';

const Orders = props => (
	<tr>
		<td>{props.order.pname}</td>
		<td>{props.order.price}</td>
		<td>{props.order.vname}</td>
		<td>{props.order.status}</td>
		<td>{props.order.qtyordered}</td>
		<td>{props.order.qtyleft}</td>
	</tr>
)

export default class ViewOrders extends Component {
	constructor(props){
		super(props);
		this.ordersList = this.ordersList.bind(this);
		this.formorders = this.formorders.bind(this);
		this.state={
			orders: [],
			products:[],
			orderlist:[]
		};
	}
	componentDidMount(){
		axios.get('http://localhost:4000/order/student/'+this.props.match.params.id)
			.then(res => {
				console.log(res.data);
				this.setState({
					orders: res.data
				});
			})
			.catch(err => {
				console.log(err);
			})
			console.log(this.state.orders);
		axios.get('http://localhost:4000/product/')
			.then(res => {
				console.log(res.data);
				this.setState({
					products: res.data
				});
				this.formorders();
			})
			.catch(err => {
				console.log(err);
			})
			console.log(this.state.products);
	}

	formorders(){
		var i,j;
			var node1=[]
			for(i=0;i<this.state.orders.length;i++){
				var order=this.state.orders[i]
				var node={
					pname:order.pname,
					price:0,
					vname:order.vname,
					status:order.status,
					qtyordered: order.qtyorder,
					qtyleft:0
				}
				for(j=0;j<this.state.products.length;j++){
					if(order.pid===this.state.products[j]._id){
						node.price=this.state.products[j].price;
						if(this.state.products[j].status==="Not Dispatched"){
							node.status="Waiting"
						}
						else if(this.state.products[j].status==="Ready"){
							node.status="Placed"
						}
						else{
							node.status=this.state.products[j].status;
						}
						node.qtyleft=Number(this.state.products[j].quantity)-Number(this.state.products[j].order);
					}
				}
				node1.push(node);
			}
			this.setState({
				orderlist: node1
			})
			console.log(this.state.orderlist);
	}

	ordersList(){
		return this.state.orderlist.map(currentord => {
			return <Orders order={currentord} key={currentord._id}/>;
		})
	}

	render(){
		return (
			<Router>
				<div style={{textAlign:"right",fontSize:"30px",fontFamily:"monospace",color:"blue"}}>Hello {this.props.match.params.id}</div>
			<div>
			  <nav style={{ lineWidth:"1500px"}}>
				<div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", alignItems: "center",flexWrap: "Wrap" }}>
					<div className="nav-wrapper white" style={{ width: "50%"}}>
						<Link
							to={"/student/"+this.props.match.params.id+"/place"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Place Order
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "50%"}}>
						<Link
							to={"/student/"+this.props.match.params.id+"/orders"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Your Orders
						</Link>
					</div>
					</div>
				</nav>
	    	  </div>
				
				<Route exact path="/student/:id/place" component={Place}/>
				<Route exact path="/student/:id/orders" component={viewOrders}/>
			</Router>
		);
	}
}