import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link } from 'react-router-dom'
import Navbar from './vendornavbar.js';
import Create from './create-product1';
import View from './view-product1';
import Ready from './rtodis-product1';
import Dispatched from './dis-product1';

export default class Vendor extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			id:this.props.match.params.id
		}
	}
	render(){
		// console.log(this.props.match.params.id);
		return (
			<Router> 
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
	    	  </div>
	    	  <Route exact path="/vendor/:id/create" component={Create}/>
	          <Route exact path="/vendor/:id/view" component={View}/>
	          <Route exact path="/vendor/:id/ready" component={Ready}/>
	          <Route exact path="/vendor/:id/dispatched" component={Dispatched}/>
			</Router>
		);
	}
}