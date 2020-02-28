import React, { Component } from "react";
import  { Link } from "react-router-dom";

class Landing extends Component {
	render(){
		return (
			<div style ={{ height: "55vh" , width: "45vh" }} className="container valign-wrapper">
				<div className="row">
					<div className="col s12 center-align">
						<p className="flow-text grey-text text-darken-1">
							<b>Register</b> Start Making profit
							<br />
							<b>Login</b> Want more profit
						</p>
						<br />
						<div className="col s6">
							<Link
								to="/register"
								style={{
									width: "150px",
									borderRadius: "3px",
									letterSpacing: "1.5px"
								}}
								className="btn btn-large waves-effect waves-light hoverable light-blue accent-3"
							>
							Register
							</Link>
						</div>
						<div className="col s6">
							<Link
								to="/login"
								style={{
									width: "150px",
									borderRadius: "3px",
									letterSpacing: "1.5px"
								}}
								className="btn btn-large waves-effect waves-light hoverable light-blue accent-3"
							>
							Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Landing;