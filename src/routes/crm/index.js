/**
 * Crm Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
   AsyncCrmComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Crm = ({ match }) => (
   <div className="Crm-wrapper">
      <Switch>
         <Redirect exact from={`${match.url}/`} to={`${match.url}/tasks`} />
         <Route path={`${match.url}/tasks`} component={AsyncCrmComponent} />
      </Switch>
   </div>
);

export default Crm;
