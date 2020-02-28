import React, {Component} from 'react';
import {BrowserRouter as Router,Link } from 'react-router-dom'


export default class Vendor extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			id:this.props.id
		}
		console.log(this.state.id);
	}
	render(){
		// console.log(this.state.id);
		return (
			<Router>
			<div>
				<nav style={{ lineWidth:"1500px"}}>
				<div style={{ display: "flex",flexDirection: "row",justifyContent: "space-between", alignItems: "center",flexWrap: "Wrap" }}>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.state.id+"/create"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Create
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.state.id+"/view"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							View
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.state.id+"/ready"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Ready
						</Link>
					</div>
					<div className="nav-wrapper white" style={{ width: "25%"}}>
						<Link
							to={"/vendor/"+this.state.id+"/dispatched"}
							style={{fontFamily: "monospace",fontSize:"20px"}}
							className="col s5 brand-logo center black-text"
						>
							Dispatched
						</Link>
					</div>
				</div>
			</nav>
			</div>
		</Router>
		);
	}
}