import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import './search.css';
import axios from 'axios';

export default class order extends Component {
	constructor(props){
		super(props);

		this.findProducts = this.findProducts.bind(this);
		this.onChange = this.onChange.bind(this);
		this.sorting = this.sorting.bind(this);
		this.getHighlightedText = this.getHighlightedText.bind(this);
		this.ordernow= this.ordernow.bind(this);

		this.state = {
			name: "",
			products: [],
			html1: "",
			sort: "price",
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

	ordernow(x){
		console.log(x);
		console.log("Mayank");
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

	};

	sorting(a,b){
		if(this.state.sort==="price")
				return Number(a.price)-Number(b.price);
		else if(this.state.sort=="qleft"){
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
		// console.log(pros);
		// console.log(this.state.sort);
		pros.sort((a,b) => this.sorting(a,b));
		// console.log(pros);
		let search=[]
		var x=0;
		pros.map(prod => {
			const regex = new RegExp(this.state.name,'gi');
			const qleft=Number(prod.quantity)-Number(prod.order);
			var currentitem={};
			const name1 = this.getHighlightedText(prod.name,this.state.name);
			currentitem.name=prod.name;
			currentitem.vname=prod.vendorname;
			currentitem.price=prod.price;
			currentitem.qleft = qleft;
			console.log(currentitem);
			search.push(<li>
						{name1}
						<span style={{ fontSize: "17px",width:"25%"}}>{currentitem.vname}</span>
						<span style={{ fontSize: "16px",width:"15%"}}>{currentitem.price}</span>
						<span style={{ fontSize: "15px",width:"10%"}}>{currentitem.qleft}</span>
						<button	style={{width:"20%",borderRadius:"1px",letterSpacing:".1px",color:"white"}} type="submit" className="btn btn-info btn-large waves-effect waves-light hoverable accent-3">Buy Now</button>
						</li> )
		});
		return search;
	}

	render(){
		return(
			<Router>
			<div style={{textAlign:"right",fontSize:"30px",fontFamily:"Courier New",color:"blue"}}>Hello {this.props.match.params.id}</div>
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
				<form className="search-form" style={{maxWidth: "400px",margin:"50px auto"}}>
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
					<ul className="suggestions" style={{width:"150%",left:"-13%"}}>
						<li>
							<span style={{ fontSize: "19px",width:"24%"}}><b>Product Name</b></span>
							<span style={{ fontSize: "19px",width:"25%"}}><b>Vendor</b></span>
							<span style={{ fontSize: "19px",width:"20%"}}><b>Price</b></span>
							<span style={{ fontSize: "19px",width:"19%"}}><b>Quantity Left</b></span>
							<span style={{ fontSize: "19px",width:"18%"}}><b>Order It</b></span>
						</li>
							{this.productsList()}
					</ul>
				</form>
			</Router>
		)
	}
}