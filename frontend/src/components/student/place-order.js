import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './search.css';
import axios from 'axios';
import BeautyStars from 'beauty-stars';
import viewOrders from './view-order1';
import Place from './place-order1';

export default class order extends Component {
	constructor(props){
		super(props);

		this.findProducts = this.findProducts.bind(this);
		this.onChange = this.onChange.bind(this);
		this.sorting = this.sorting.bind(this);
		this.getHighlightedText = this.getHighlightedText.bind(this);
		this.ordernow = this.ordernow.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.calcprice = this.calcprice.bind(this);
		this.placeOrder = this.placeOrder.bind(this);
		this.giverating = this.giverating.bind(this);
		this.submitrating = this.submitrating.bind(this);

		this.state = {
			id:this.props.match.params.id,
			name: "",
			products: [],
			ratedproducts:[],
			vendors: [],
			html1: "",
			status: "",
			sort: "price",
			display:"none",
			display1 : "none",
			display2: "none",
			display3: "none",
			alignment:"center",
			pid:"",
			pname:"",
			pprice:"",
			pvname: "",
			pqleft: "",
			vrating: "",
			avg: 0,
			cost: "",
			value: "",
			stars: 0,
			errors: {}
		};
	}

	componentDidMount(){
		axios.get('http://localhost:4000/product/')
			.then(res => {
				console.log(res.data);
				this.setState({
					products: res.data
				});
			})
			.catch(err => {
				console.log(err);
			})
		axios.get('http://localhost:4000/vendor/')
			.then(res => {
				console.log(res.data);
				this.setState({
					vendors:res.data
				});
			})
			.catch(err => {
				console.log(err);
			})
		// console.log(this.state.products,this.state.vendors);
	}

	ordernow = e => {
		console.log(e.currentTarget);
		this.setState({
			alignment:"left",
			display: "block",
			value: "",
			display1: "none",
			display2: "none",
			display3: "none",
			pid: e.currentTarget.dataset.id,
			pname: e.currentTarget.dataset.name,
			pprice: e.currentTarget.dataset.price,
			pvname: e.currentTarget.dataset.vname,
			pqleft: e.currentTarget.dataset.qleft
		})
		// document.getElementBy
		// console.log(id);
	}

	findProducts(wordToMatch){
		wordToMatch = wordToMatch.replace(/\\/g,"\\\\");
		return this.state.products.filter(prod => {
			const reg = new RegExp(wordToMatch,'gi');
			if(prod.status =="Not Dispatched")
				return prod.name.match(reg);
		})
	}

	onChange = e => {
		console.log(e.target.id,e.target.value);

		this.setState({
			[e.target.id]: e.target.value
		});

		this.setState({
			alignment:"center",
			display:"none",
			value: "",
			display1: "none",
			display2: "none",
			display3: "none"
		})

	};

	handleChange = e =>{

		this.setState({
			[e.target.id]: e.target.value,
			display1: "none",
			display2: "none",
			display3: "none"
		});

	}

	calcprice = e =>{
		e.preventDefault();

		const order = Number(this.state.value);
		const qlef = Number(this.state.pqleft);
		console.log(order,qlef);
		if(order>qlef){
			this.setState({
				cost:"Not in Stock",
				display2:"block",
				display1: "none",
				display3: "none"
			})
		}
		else{
			var cost = order*(Number(this.state.pprice));
			this.setState({
				cost: cost,
				display2: "none",
				display3: "none",
				display1: "block"
			})
		}

	}

	placeOrder = e => {

		e.preventDefault();

		this.setState({
			display3:"block",
			display1:"none",
			display2:"none",
			display:"none"
		})
		// console.log(e);
		console.log(this.state.pid,this.state.value);

		const node={
			value:this.state.pid,
			order:this.state.value
		}
		axios.post('http://localhost:4000/product/update/',node)
			.then(res => {
				console.log(res.data)
				this.setState({
					status: res.data 
				})
				const order = {
					pid: this.state.pid,
					pname: this.state.pname,
					vname: this.state.pvname,
					sname: this.state.id,
					order: this.state.value,
					status: this.state.status
				}
				console.log(order);
				axios.post('http://localhost:4000/order/add',order)
					.then(res => { 
						console.log(res.data);
						const node2 = {
							pid: this.state.pid,
							sname: this.state.id,
							status: this.state.status
						}
						console.log(node2);
						axios.post('http://localhost:4000/order/update/status',node2)
							.then(res => {
								console.log(res.data);
								const node1 ={
									name:this.state.pvname
								}
								console.log(node1);
								axios.post('http://localhost:4000/vendor/vdetails/',node1)
									.then(res => {
										console.log(res.data);
										console.log(res.data.rating,res.data.customers,(res.data.rating)/(res.data.customers));
										this.setState({
											avg:(res.data.rating)/(res.data.customers)
										})
										console.log(this.state.avg);
									})
								})
						})
				})


	}

	giverating = e => {
		console.log(e);
		this.setState({
			stars: e
		})
	}

	submitrating = e => {
		console.log(e);
		const node = {
			name: this.state.pvname,
			star: this.state.stars
		}
		console.log(node);
		axios.post('http://localhost:4000/vendor/rate/',node)
			.then(res => {
				console.log(res.data);
				window.location.reload();
			});
		this.setState({
			alignment:"center",
			display3:"none"
		})

		// var avg=0;
		const node1={
			name:this.state.pvname,
			rating:Math.round(this.state.avg*10)/10
		}
		console.log(node1);
		axios.post('http://localhost:4000/product/updatevrating/',node1)
			.then(res => console.log(res.data));

		this.setState({
			value:"",
			star: 0
		})

	}

	sorting(a,b){
		if(this.state.sort==="price")
				return Number(a.price)-Number(b.price);
		else if(this.state.sort==="qleft"){
			const x1=Number(a.quantity)-Number(a.order);
			const x2=Number(b.quantity)-Number(b.order);
			return x1-x2;
		}
		else{
			return b.vrating-a.vrating;
		}
	}

	getHighlightedText(text, higlight) {
		console.log(text,higlight);
    // Split on higlight term and include term into parts, ignore case
	    const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
	    return <span style={{ fontSize: "19px",width:"30%"}}> { parts.map((part) => 
	        <span style={ part.toLowerCase() === higlight.toLowerCase()?{ backgroundColor:"lightgreen" }:{}}>
	            { part }
	        </span>)
	    } </span>;
}

	productsList(){

		let pros = this.findProducts(this.state.name);
		pros.sort((a,b) => this.sorting(a,b));
		let search=[]
		pros.map(prod => {
			// const regex = new RegExp(this.state.name,'gi');
			const qleft=Number(prod.quantity)-Number(prod.order);
			var currentitem={};
			const name1 = this.getHighlightedText(prod.name,this.state.name);
			// console.log(name1);
			currentitem.name=prod.name;
			currentitem.vname=prod.vendorname;
			currentitem.price=prod.price;
			currentitem.qleft = qleft;
			var i;
			currentitem.vrating=0;
			for(i=0;i<(this.state.vendors.length);i++){
				const vend=this.state.vendors[i];
				if(vend.name===prod.vendorname){
					if(vend.customers>0){
						var x=(vend.rating)/(vend.customers);
						currentitem.vrating=Math.round(x*10)/10;
						break;
					}
				}
			}
			search.push(<li key={prod._id} onClick={this.ordernow.bind(this)} data-id={prod._id} data-name={currentitem.name} data-price={currentitem.price} data-vname={currentitem.vname} data-qleft={currentitem.qleft}>
						{name1}
						<span style={{ fontSize: "19px",width:"20%"}}>{currentitem.vname}</span>
						<span style={{ fontSize: "18px",width:"15%"}}>{currentitem.price}</span>
						<span style={{ fontSize: "18px",width:"20%"}}>{currentitem.qleft}</span>
						<span style={{ fontSize: "18px",width:"15%"}}>{currentitem.vrating}</span>
						</li> )
			return 0;
		});

		return search;
	}

	render(){
		return(
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
		)
	}
}