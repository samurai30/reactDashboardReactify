import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {AysncTasksComponent} from "Components/AsyncComponent/AsyncComponent";


const Tasks = ({match}) =>(

    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/approved`} />
            <Route path={`${match.url}/approved`} component={AysncTasksComponent} />
        </Switch>
    </div>
);
export default Tasks;
