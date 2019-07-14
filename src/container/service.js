/**
 * Horizontal App
 */
import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

// app default layout
import RctAppLayout from '../components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class Services extends Component {
    render() {
        const { match, location } = this.props;
        if (location.pathname === '/services') {
            return (<Redirect to={'/services/approved'} />);
        }
        return (

            <RctAppLayout>
                {routerService && routerService.map((route, key) =>
                    {
                        <Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
                    }
                )}
            </RctAppLayout >
        );
    }
}

export default withRouter(Services);
