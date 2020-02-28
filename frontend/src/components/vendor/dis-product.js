import React, {Component} from 'react';
// import axios from 'axios';
// import {Link} from 'react-router-dom';
import Navbar1 from './vendornavbar';

export default class Dispatch extends Component {

	render(){
		return (
			<div>
				<Navbar1 id={this.props.match.params.id} />
			</div>
		)
	}
}