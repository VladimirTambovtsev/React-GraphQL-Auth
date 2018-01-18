import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm'; 
import signupMutation from '../queries/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {

	constructor(props) {
		super(props);
		this.state = { errors: [] };
	}

	componentWillUpdate(nextProps) {	// update component to get Old and New props
		// this.props - old props
		// nextProps - new props
		console.log(this.props, nextProps);
		if (!this.props.data.user && nextProps.data.user) {		// if old req and new req with user exists
			hashHistory.push('/dashboard')	// redirect to our page
		}
	}

	onSubmit({ email, password }) { // get variables from Child component
		this.props.mutate({
			variables: { email, password },
			refetchQueries: [{ query }]
		}).catch(res => {
			const errors = res.graphQLErrors.map(error => error.message);
			this.setState({ errors });
		});
	}

	render(){
		return (
			<div className="container"> 
				<h4>Signup</h4>
				<AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors} /> 
			</div>
		);
	}
}


export default graphql(query)(
	graphql(signupMutation)(SignupForm)
);