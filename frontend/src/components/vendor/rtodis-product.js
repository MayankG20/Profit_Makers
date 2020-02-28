import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './vendornavbar';

export default class Rtodis extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<Navbar id={this.props.match.params.id} />
			</div>
		)
	}
}