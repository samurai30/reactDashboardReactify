/**
 * App Routes
 */
import React, { Component } from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";
import {fetchUserDetails} from "Actions";


class DefaultLayout extends Component {


	componentDidMount(){
		const {user_id} = this.props;
		if (user_id !== null){
			this.props.fetchUserDetails(user_id);
		}
	}

	render() {
		const { match,userData } = this.props;

		return (
			<RctAppLayout userData={userData}>
				{routerService && routerService.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctAppLayout>
		);

	}
}
const mapStateToProps = state =>({
	...state.auth
});
export default withRouter(connect(mapStateToProps,{
	fetchUserDetails
})(DefaultLayout));
