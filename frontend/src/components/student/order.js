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
		console.log(props);
		this.state={
			id:this.props.match.params.id
		}
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