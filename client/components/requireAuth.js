import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


export default (WrappedComponent) => {
	
	class requireAuth extends Component {	// High Order Component
		
		componentWillUpdate(nextProps) {				// do every single time when sth updates
			if (!nextProps.data.user && !nextProps.data.loading) {  // if there is no auth user & is not loading
				hashHistory.push('/login');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}


	return graphql(currentUser)(requireAuth);
}