import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const validateRegisterInput = require('../../validation/register');

class Register extends Component {
	constructor(){
		super();
		this.state ={
			name: "",
			email: "",
			password: "",
			password2: "",
			profile: "Student",
			status: "",
			errors: {}
		};
	}

	onChange = e => {
		// console.log(e);
			this.setState({
				[e.target.id]: e.target.value
			});
	};

	onSubmit = e => {
		e.preventDefault();
		// console.log(e);

		const { errors,isValid }= validateRegisterInput(this.state);

		console.log(isValid);
		if(!isValid){
			this.setState({
				errors: errors
			});
			// this.state.errors=errors;
			console.log(this.state.errors);
		}
		else{

			this.setState({
				errors: errors
			});
			const newUser = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
				password2: this.state.password2,
				profile: this.state.profile
			};

			console.log(newUser);

			if(this.state.profile==="Vendor"){
				axios.post('http://localhost:4000/vendor/add',newUser)
					.then(res => {
						// var count1=Object.keys(res.data).length;
						console.log(res.data.name.length);
						if("_id" in res.data){
							this.setState({
								status: "Registration Successful!!!",
								errors: {}
							})
						}
						else{
							this.setState({
								errors:res.data
							});
						}
						console.log(this.state.errors);
					});
			}
			else{
				axios.post('http://localhost:4000/student/add',newUser)
					.then(res => {
						console.log(res);
						// console.log(res.data.name.length);
						// var count1=Object.keys(res.data).length;
						// console.log("mayakn");
						if("_id" in res.data){
							this.setState({
								status: "Registration Successful!!!",
								errors: {}
							})
						}
						else{
							this.setState({
								errors:res.data
							});
						}
						console.log(this.state.errors);
					});
			}

			this.setState({
				name: "",
				email: "",
				password: "",
				password2: "",
				status: "",
				errors: {},
				profile: ""
			})
		}
	};

	render(){

	return(
		<div className="container">
			<div className="row">
				<div className="col s8 offset-s2">
					<Link to="/" className="btn-flat waves-effect">
						<i className="material-icons left">keyboard_backspace</i>
							Back to Home
					</Link>
					<div className="col s12" style={{ paddingLeft: "11.25px" }}>
						<h4>
							<b>Register</b> Below...
						</h4>
						<p className="grey-text text-darken-1">
							Already making profit with this app? <Link to="/login">Login</Link>
						</p>
					</div>
					<form noValidate onSubmit={this.onSubmit}>
						<div className="input-field col s12">
							<input
								value = {this.state.name}
								onChange = {this.onChange}
								id = "name"
								type = "text"
							/>
							<label htmlFor="name">Name</label>
						</div>
							<div style={{ color: "red" }}>{this.state.errors.name}</div>
							<div style={{ color: "red" }}>{this.state.errors.Name}</div>
						<div className="input-field col s12">
			                <input
			                  onChange={this.onChange}
			                  value={this.state.email}
			                  id="email"
			                  type="email"
			                />
			                <label htmlFor="email">Email</label>
			              </div>
			                <div style={{ color: "red" }}>{this.state.errors.email}</div>
			                <div style={{ color: "red" }}>{this.state.errors.Email}</div>
			              <div className="input-field col s12">
			                <input
			                  onChange={this.onChange}
			                  value={this.state.password}
			                  id="password"
			                  type="password"
			                />
			                <label htmlFor="password">Password</label>
			              </div>
			                <div style={{ color: "red" }}>{this.state.errors.psswd1}</div>
			              <div className="input-field col s12">
			                <input
			                  onChange={this.onChange}
			                  value={this.state.password2}
			                  id="password2"
			                  type="password"
			                />
			                <label htmlFor="password2">Confirm Password</label>
			              </div>
			                <div style={{ color: "red" }}>{this.state.errors.psswd2}</div>
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
						  		Signup
						  	</button>
						  </div>
						  <div style={{color: "green", fontFamily:"Courier New", fontSize: "40px"}}>{this.state.status}</div>
						 </form>
						</div>
					</div>
				</div>
		);
	}
}

export default Register;