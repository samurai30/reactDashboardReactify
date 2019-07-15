/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncHomeDashboardComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Dashboard = ({ match }) => (
   <div className="Crm-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
         <Route path={`${match.url}/home`} component={AsyncHomeDashboardComponent} />
      </Switch>
   </div>
);

export default Dashboard;
