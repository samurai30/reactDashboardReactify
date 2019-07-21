/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncUsersListComponent,
    AsyncUserProfile1Component,
    AsyncUserProfileComponent,
    AsyncUserManagementClientComponent,
    AsyncUserManagementAdminComponent, AsyncUserManagementSubAdminComponent, AsyncUserManagementSurveyorComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => {
    return (

        <div className="content-wrapper">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/user-profile-1`} />
                <Route path={`${match.url}/user-list`} component={AsyncUsersListComponent} />
                <Route path={`${match.url}/user-profile-1`} component={AsyncUserProfile1Component} />
                <Route path={`${match.url}/user-profile`} component={AsyncUserProfileComponent} />
                <Route path={`${match.url}/user-management/clients`} component={AsyncUserManagementClientComponent} />
                <Route path={`${match.url}/user-management/admin`} component={AsyncUserManagementAdminComponent} />
                <Route path={`${match.url}/user-management/subadmin`} component={AsyncUserManagementSubAdminComponent} />
                <Route path={`${match.url}/user-management/surveyor`} component={AsyncUserManagementSurveyorComponent} />
            </Switch>
        </div>
    )
};

export default Forms;
