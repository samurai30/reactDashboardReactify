/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from 'react';
import Loadable from 'react-loadable';

// rct page loader
import RctPageLoader from 'Components/RctPageLoader/RctPageLoader';

// home dashboard
const AsyncHomeDashboardComponent = Loadable({
   loader: () => import("Routes/dashboard/home"),
   loading: () => <RctPageLoader />,
});


const AysncTasksComponent = Loadable({
   loader: () => import('Routes/tasks/approved'),
   loading : () => <RctPageLoader/>
});

export {
   AsyncHomeDashboardComponent,
   AysncTasksComponent
};
