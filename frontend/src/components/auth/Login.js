import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';

const validateLoginInput = require('../../validation/login');

class Login extends Component {
	constructor(){
		super();
		this.state ={
			name: "",
			password: "",
			profile:"Student",
			status: "",
			vendor: "",
			student: "",
			errors: {}
		};
	}

	onChange = e => {
		// console.log(e.target.id,e.target.value);
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		// console.log(this.state);
		const { errors,isValid }= validateLoginInput(this.state);

		if(!isValid){
			this.setState({
				errors: errors
			});
			// this.state.errors=errors;
			console.log(this.state.errors);
		}

		else{

			this.setState({
				errors: {}
			});
			const userData = {
				name: this.state.name,
				password: this.state.password,
				profile: this.state.profile
			};
			
			if(this.state.profile==="Vendor"){
				// console.log("Myank");
				axios.post('http://localhost:4000/vendor/exist',userData)
					.then(res => {
						console.log(res);
						if(res.data.success){
							this.setState({
								status: "Login Successful",
								vendor: userData.name
							});
						}
						else{
							this.setState({
								errors: res.data
							})
						}
					})

			}
			else{
				axios.post('http://localhost:4000/student/exist',userData)
					.then(res => {
						console.log(res);
						if(res.data.success){
							this.setState({
								status: "Login Successful",
								student: userData.name
							});
						}
						else{
							this.setState({
								errors: res.data
							})
						}
					});
			}
			this.setState({
				name:"",
				password: "",
				errors: {}
			});
		}
	};

	render(){
			if(this.state.status==="Login Successful"){
				if(this.state.profile==="Vendor")
					return <Redirect push to={"vendor/"+this.state.vendor}/>
				else{
					return <Redirect push to={"student/"+this.state.student}/>
				}
			}

	return(
		<div className="container">
			<div className="row" style={{ marginTop: "4rem" }}>
				<div className="col s8 offset-s2">
					<Link to="/" className="btn-flat waves-effect">
						<i className="material-icons left">keyboard_backspace</i>
							Back to Home
					</Link>
					<div className="col s12" style={{ paddingLeft: "11.25px" }}>
						<h4>
							<b>Login</b> Below...
						</h4>
						<p className="grey-text text-darken-1">
							Going to Make Profit for the first time ? <Link to="/register">Register</Link>
						</p>
					</div>
					<form noValidate onSubmit={this.onSubmit}>
						  <div className="input-field col s12">
							<input
								onChange = {this.onChange}
								value = {this.state.name}
								id = "name"
								type = "text"
							/>
							<label htmlFor="name">Name</label>
						  </div>
						  <div style={{ color: "red"}}>{this.state.errors.name}{this.state.errors.usernotfound}</div>
			              <div className="input-field col s12">
			                <input
			                  onChange={this.onChange}
			                  value={this.state.password}
			                  // error={errors.psswd1}
			                  id="password"
			                  type="password"
			                />
			                <label htmlFor="password">Password</label>
			              </div>
			              <div style={{ color: "red" }}>{this.state.errors.psswd1}{this.state.errors.wrongpassword}</div>
			              <div className="input-field col s12">
			              	<label>Profile-type: </label>
			              	<select
			              		required
			              		value={this.state.profile}
			              		onChange={this.onChange}
			              		id="profile"
			              		style={{marginTop:"3rem"}}
			              		className="form-control">
			              		<option value= "Student">Student</option>
			              		<option value = "Vendor" >Vendor</option>
			              	</select>
						  </div>
						  <div className="col s12" style={{ paddingLeft:"11.25px"}}>
						  	<button
						  		style={{
						  			width: "150px",
						  			borderRadius: "3px",
						  			letterSpacing: "1.5px",
						  			marginTop: "1rem",
						  			color: "white"
						  		}}
						  		type="submit" 
						  		className="btn btn-large waves-effect waves-light hoverable blue accent-3">
						  		Login
						  	</button>
						  </div>
						  <br />
						  <div style={{ color: "green", fontFamily: "Courier New" ,fontSize: "40px" }}>{this.state.status}</div>
						 </form>
						</div>
					</div>
				</div>
		);
	}
}

export default Login;