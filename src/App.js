/**
* Main App
*/
import React from 'react';
import {connect, Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// css
import './lib/reactifyCss';

// app component
import App from './container/App';

import { configureStore } from './store';
import {Redirect} from "react-router";
import {AsyncSessionPage404Component} from "Components/AsyncComponent/AsyncComponent";



const MainApp = () => (
	<Provider store={configureStore()}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Router>
				<Switch>

					<Route path="/" component={App} />

				</Switch>
			</Router>
		</MuiPickersUtilsProvider>
	</Provider>
);

export default MainApp;
