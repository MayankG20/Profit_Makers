import React, {Component} from 'react';
import { Link ,BrowserRouter as Router} from 'react-router-dom';
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


class Overlay extends Component{
	//
	constructor(props){
		super(props);
		this.state={
			value:"",
			cost:"",
			pqleft:0,
			pprice:0,
			display:"block",
			disp:"block",
			display1:"none",
			display2:"none"
		};
	}
	handleChange = e =>{

		this.setState({
			[e.target.id]: e.target.value
		});

	}
	calcprice = e =>{
		e.preventDefault();

		const order = Number(this.state.value);
		const qlef = Number(this.props.qtyl)+ Number(this.props.qtyo);
		console.log(order,qlef);
		if(order>qlef){
			this.setState({
				cost:"Not in Stock",
				display:"none",
				display1:"none",
				display2:"block"
			})
		}
		else{
			var cost = order*(Number(this.props.price));
			this.setState({
				cost: cost,
				display:"none",
				display1:"block",
				display2:"none"
			})
		}

	}
	placeOrder = e => {
		e.preventDefault();

		const node={
			value:this.props.pid,
			order:Number(this.state.value)-Number(this.props.qtyo)
		}
		console.log(node);
		axios.post('http://localhost:4000/product/update/',node)
			.then(res => {
				console.log(res.data);
				var x=res.data;
				console.log(x);
				const order = {
					value: this.props.id,
					order:this.state.value
				}
				console.log(order);
				axios.post('http://localhost:4000/order/update/quantity',order)
					.then(res => {
						console.log(res.data);
						const node1={
							pid:this.props.pid,
							status:x
						}
						axios.post('http://localhost:4000/order/update/status',node1)
							.then(res => {
								console.log(res.data);
								window.location.reload();
							})
						this.setState({
							display:"block",
							display2:"none",
							display1:"none"
						})
						this.props.updateState();
					})

			})

	}
	off1 = e => {
		this.setState({
			display:"block",
			display2:"none",
			display1:"none"
		})
		this.props.updateState();
	}
	render(){
		//send some this.state variables to use in this component
		var x= Number(this.props.qtyl)+ Number(this.props.qtyo);
		// var y = Number(this.props.price);
		console.log(x);
		console.log(this.props);
		return (
			<div 
				style={{
					  position: "fixed",
					  display: "block",
					  overflow: "auto",
					  width: "15%",
					  height: "35%",
					  top: "30%",
					  left:"82%",
					  right:"5%",
					  backgroundColor: "rgba(0,0,0,0)",
					  zIndex: "93",
					  cursor: "pointer",
				}}>
				<div style={{width:"100%",height:"20%"}}></div>
				<div style={{display:this.state.display,color:"blue",fontSize:"20px"}}>
					<b>Maximum Quantity you can order is {x}</b>
					<br/>
					<b>You have already ordered {this.props.qtyo}</b>
					<form>
						<label style={{fontSize:"20px",fontFamily:"monospace",color:"blue"}}>
							<b>{this.props.pname} required: </b>
							<input type="text" value={this.state.value}
								id="value"
								onChange={this.handleChange} />
						</label>
							<input type="submit" value="Submit" className="btn btn-primary" onClick={this.calcprice} />
					</form>
				</div>
				<div style={{display:this.state.display1,color:"green",fontSize:"20px"}}>
					<b>It will cost you: {this.state.cost}</b>
					<input type="submit" value="Place Order" className="btn btn-success" onClick={this.placeOrder}/>
				</div>
				<div style={{display:this.state.display2,color:"red",fontSize:"30px"}} onClick={this.off1}>
					<b>{this.state.cost}</b>
				</div>
			</div>
		);
	}
}


export default class ViewOrders extends Component {
	//
	constructor(props){
		super(props);
		this.ordersList = this.ordersList.bind(this);
		this.formorders = this.formorders.bind(this);
		this.changeorder = this.changeorder.bind(this);
		this.updateState = this.updateState.bind(this);
		this.state={
			orders: [],
			products:[],
			orderlist:[],
			display:false,
			qtyo:0,
			qtyl:0,
			price:0,
			id:0,
			pid:0,
			pname:"",
			vname:"",
			status:""
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

	updateState(){
		this.setState({
			display:false
		})
	}

	formorders(){
		var i,j;
			var node1=[]
			for(i=0;i<this.state.orders.length;i++){
				var order=this.state.orders[i]
				var node={
					id:order._id,
					pname:order.pname,
					price:0,
					pid:order.pid,
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

	changeorder = e => {
		console.log(e.currentTarget);
		var x =e.currentTarget.dataset;
		console.log(x);
		this.setState({
			display: false
		})
		if(e.currentTarget.dataset.status=="Waiting"){
			this.setState({
				display: true,
				qtyo: x.qtyordered,
				qtyl: x.qtyleft,
				pname: x.pname,
				price: x.price,
				vname: x.vname,
				id: x.id,
				pid: x.pid,
				status: x.status
			})
		}
	}

	ordersList(){
		return this.state.orderlist.map(currentord => {
			console.log(currentord);
			return (
				<tr onClick={this.changeorder.bind(this)} data-id={currentord.id} data-pid={currentord.pid} data-pname={currentord.pname} data-price={currentord.price} data-vname={currentord.vname} data-status={currentord.status} data-qtyordered={currentord.qtyordered} data-qtyleft={currentord.qtyleft}>
					<td>{currentord.pname}</td>
					<td>{currentord.price}</td>
					<td>{currentord.vname}</td>
					<td>{currentord.status}</td>
					<td>{currentord.qtyordered}</td>
					<td>{currentord.qtyleft}</td>
				</tr>
			)
		})
	}

	render(){
		return (
			<div>
			{this.state.display ? <Overlay qtyl={this.state.qtyl} qtyo={this.state.qtyo} price={this.state.price} pname={this.state.pname} updateState={this.updateState} pid={this.state.pid} id={this.state.id} /> : null }
			<div style={{zIndex:"1"}}>
				<div style={{width:"100%",height:"2vh"}}></div>
			  <h3 style={{ fontFamily: "monospace", color:"skyblue"}}>List of all Your Orders</h3>
				<div style={{width:"100%",height:"3vh"}}></div>
			  <table className="table">
			    <thead className="thead-light">
			      <tr>
			        <th>Name</th>
			        <th>Price</th>
			        <th>Vendor Name</th>
			        <th>Status</th>
			        <th>Qty Ordered</th>
			        <th>Qty Left</th>
			      </tr>
			    </thead>
			    <tbody>
			      { this.ordersList() }
			    </tbody>
			  </table>
			 </div>
			</div>
		);
	}
}


