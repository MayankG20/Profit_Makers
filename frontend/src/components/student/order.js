import React, {Component} from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';
import './search.css';
import axios from 'axios';
import BeautyStars from 'beauty-stars';

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

		this.state = {
			id:this.props.match.params.id,
			name: "",
			products: [],
			html1: "",
			sort: "price",
			display:"none",
			display1 : "none",
			display2: "none",
			display3: "none",
			alignment:"center",
			pname:"",
			pprice:"",
			pvname: "",
			pqleft: "",
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
			return prod.name.match(reg);
		})
	}

	onChange = e => {

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

		this.setState({
			value:""
		})
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

	}

	giverating = e => {
		console.log(e)
		this.setState({
			stars: e
		})
	}

	sorting(a,b){
		if(this.state.sort==="price")
				return Number(a.price)-Number(b.price);
		else if(this.state.sort==="qleft"){
			const x1=Number(a.quantity)-Number(a.order);
			const x2=Number(b.quantity)-Number(b.order);
			return x2-x1;
		}
		else{
			return a.name-b.name;
		}
	}

	getHighlightedText(text, higlight) {
		console.log(text,higlight);
    // Split on higlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span style={{ fontSize: "19px",width:"20%"}}> { parts.map((part) => 
        <span style={ part.toLowerCase() === higlight.toLowerCase()?{ backgroundColor:"lightgreen" }:{}}>
            { part }
        </span>)
    } </span>;
}

	productsList(){
		let pros = this.findProducts(this.state.name);
		console.log(pros);
		// console.log(this.state.sort);
		pros.sort((a,b) => this.sorting(a,b));
		// console.log(pros);
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
			// console.log(prod._id);
			// console.log(currentitem);
			search.push(<li key={prod._id} onClick={this.ordernow.bind(this)} data-id={prod._id} data-name={currentitem.name} data-price={currentitem.price} data-vname={currentitem.vname} data-qleft={currentitem.qleft}>
						{name1}
						<span style={{ fontSize: "19px",width:"25%"}}>{currentitem.vname}</span>
						<span style={{ fontSize: "18px",width:"15%"}}>{currentitem.price}</span>
						<span style={{ fontSize: "18px",width:"10%"}}>{currentitem.qleft}</span>
						</li> )
			return 0;
		});

		return search;
	}

	render(){
		return(
			<Router>
			<div style={{textAlign:"right",fontSize:"30px",fontFamily:"Courier New",color:"blue"}}>Hello {this.props.match.params.id}</div>
				<div style={{textAlign:"right"}}>
					<Link
						to={"/student/"+this.state.id+"/orders"}
						style={{fontFamily: "monospace",fontSize:"20px"}}
						className="col s5 brand-logo center black-text"
					>
					Your orders
					</Link>
				</div>
				<div className="input-field col s12" style={{float:"left"}}>
					<label style={{marginTop:"-4rem"}}>Sort By: </label>
					<select
						value={this.state.sort}
						onChange={this.onChange}
						id="sort"
						default="added date"
						style={{width:"25%",marginTop:"-1.5rem"}}
						className="form-control">
						<option value="price">Price</option>
						<option value="qleft">Quantity left</option>
						<option value="rating">Rating</option>
					</select>
				</div>
				<div className="searchp" style={{float:this.state.alignment}}>
				<form className="search-form" style={{maxWidth: "400px",margin:"5% auto"}}>
					<input 
						type="text"  
						id="name"
						value= {this.state.name}
						onChange= {this.onChange}
						placeholder ="Product Name"
						style={{
							margin: "0px",
							textAlign: "center",
							outline: "0px",
							border: "10px solid #F7F7F7",
							width: "120%",
							left: "0%",
							position: "relative",
							top: "10px",
							zIndex: "2",
							borderRadius: "5px",
							fontSize: "30px",
							boxShadow: "0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19)",
						}}
					/>
					<ul className="suggestions" style={{width:"120%",left:"3%"}}>
						<li>
							<span style={{ fontSize: "19px",width:"28%"}}><b>Product  Name  </b></span>
							<span style={{ fontSize: "19px",width:"35%"}}><b>Vendor</b></span>
							<span style={{ fontSize: "19px",width:"20%"}}><b>Price</b></span>
							<span style={{ fontSize: "19px",width:"15%"}}><b>Quantity Left</b></span>
						</li>
							{this.productsList()}
					</ul>
				</form>
				</div>
				<div style={{display:this.state.display,float:"right",marginTop:"-21rem"}} className="input-field col s12">
					<form style={{float:"right",width:"20%"}}>
						<label style={{fontSize:"20px",fontFamily:"Courier New",color:"blue"}}>
							<b>{this.state.pname} required: </b>
							<input type="text" value={this.state.value}
								id="value"
								onChange={this.handleChange} />
						</label>
							<input type="submit" value="Submit" className="btn btn-primary" onClick={this.calcprice} />
					</form>
				</div>
				<div style={{display:this.state.display1,float:"right",marginTop:"-7rem",marginLeft:"38rem",fontSize:"20px",fontFamily:"Courier New",color:"green"}}>
						<b>It will cost you: {this.state.cost}</b>
						<input type="submit" value="Place Order" className="btn btn-success" onClick={this.placeOrder}/>
				</div>
				<div style={{display:this.state.display2,float:"right",marginTop:"-7rem",marginLeft:"38rem",fontSize:"20px",fontFamily:"Courier New",color:"red"}}>
					<b>{this.state.cost}</b>
				</div>
				<div style={{display:this.state.display3,float:"right",marginTop:"-20rem",marginLeft:"38rem",width:"20%",fontSize:"20px",fontFamily:"Courier New",color:"orange"}}>
					Rate the Vendor ({this.state.pvname}):
						<BeautyStars
							value={this.state.stars}
							onChange={this.giverating}
						/>
				</div>
			</Router>
		)
	}
}