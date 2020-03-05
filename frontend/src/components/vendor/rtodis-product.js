import React, {Component} from 'react';
// import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './vendornavbar';

export default class Rtodis extends Component {

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
				Will show you all products for which minimum quantity is covered shortly.
			
			</div>
		)
	}
}