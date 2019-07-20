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

import {AsyncAdminLoginComponent} from "Components/AsyncComponent/AsyncComponent";
import {api} from "Api";
/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component,authToken,...rest }) =>{
    return(   <Route
       {...rest}
       render={props =>
           authToken
               ? <Component {...props}/>
               : <Redirect
                   to={{
                       pathname: '/admin-login',
                       state: { from: props.location }
                   }}
               />}
   />);
};
class App extends Component {
    constructor(props){
        super(props);
        const token = localStorage.getItem('jwtToken');
        if(token){
            api.setToken(token);
        }
    }

    componentDidMount(){
        const {token} = this.props;
        if(token === null){
            this.props.history.push("/admin-login");
        }
    }
    componentDidUpdate(prevProps,prevState){
        const {token} = this.props;
        if (prevProps.token !== token){
            this.props.history.push("/admin-login")
        }

    }

   render() {
      const {  location,match,token } = this.props;

       if (location.pathname === '/') {
           if(token === null){
              return (<Redirect to={'/admin-login'}/>);
           } else {
              return (<Redirect to={'/app/dashboard/home'}/>)
           }
       }
      return (
         <RctThemeProvider>
            <NotificationContainer />
            <InitialPath
               path={`${match.url}app`}
               authToken = {token}
               component={RctDefaultLayout}
            />
            <Route path="/admin-login" component={AsyncAdminLoginComponent}/>
         </RctThemeProvider>
      );
   }
}

// map state to props
const mapStateToProps = state =>({
    ...state.auth
});

export default connect(mapStateToProps)(App);
