/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Main App
import RctDefaultLayout from './DefaultLayout';

import CRMLayout from './CRMLayout';
import {AsyncAdminLoginComponent} from "Components/AsyncComponent/AsyncComponent";
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser,...rest }) =>{
   return( <Route
       {...rest}
       render={props =>
           authUser.token
               ? <Component {...props} />
               : <Redirect
                   to={{
                       pathname: '/admin-login',
                       state: { from: props.location }
                   }}
               />}
   />)
}
class App extends Component {
   render() {
      const { location, match, token, user_id } = this.props;
      if (location.pathname === '/') {

          if (token === null && user_id === null) {
              return (<Redirect to={'/admin-login'} />);
          } else {
              return (<Redirect to={'/app/dashboard/home'} />);
          }
      }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <InitialPath
               path={`${match.url}app`}
               authUser={{token,user_id}}
               component={RctDefaultLayout}
            />
            <Route path="/dashboard" component={CRMLayout} />
            <Route path="/admin-login" component={AsyncAdminLoginComponent}/>
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = ({ auth }) => {
   const { token,user_id } = auth;
   return { token,user_id };
};

export default connect(mapStateToProps)(App);
