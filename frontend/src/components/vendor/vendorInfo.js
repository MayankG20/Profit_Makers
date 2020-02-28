import React, {Component} from 'react';
import {BrowserRouter as Router, Route,Link, Redirect } from 'react-router-dom'
import Navbar from './vendornavbar.js';

export default class Vendor extends Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state={
			id:this.props.match.params.id
		}
	}
	render(){
		// console.log(this.state.id);
		return (
			<Router>
				<div>
					<Navbar id={this.state.id}/>
				</div>
			</Router>
		);
	}
}