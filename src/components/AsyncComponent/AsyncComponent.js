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

// crm dashboard
const AsyncCrmComponent = Loadable({
   loader: () => import("Routes/crm/dashboard"),
   loading: () => <RctPageLoader />,
});

const AysncTasksComponent = Loadable({
   loader: () => import('Routes/Services/approved'),
   loading : () => <RctPageLoader/>
});

export {
   AsyncHomeDashboardComponent,
   AsyncCrmComponent,
   AysncTasksComponent
};
