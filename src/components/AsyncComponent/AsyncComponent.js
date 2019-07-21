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

const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader/>
});

const AsyncUsersListComponent = Loadable({
   loader: () => import('Routes/users/user-list'),
   loading: () => <RctPageLoader/>
});
const AsyncUserProfileComponent = Loadable({
   loader: () => import('Routes/users/user-profile'),
   loading: () => <RctPageLoader/>
});
const AsyncUserProfile1Component = Loadable({
   loader: () => import('Routes/users/user-profile-1'),
   loading: () => <RctPageLoader/>
});
const AsyncUserManagementClientComponent = Loadable({
   loader: () => import('Routes/users/user-management/client'),
   loading: () => <RctPageLoader/>
});
const AsyncUserManagementAdminComponent = Loadable({
   loader: () => import('Routes/users/user-management/admin'),
   loading: () => <RctPageLoader/>
});
const AsyncUserManagementSubAdminComponent = Loadable({
   loader: () => import('Routes/users/user-management/sub-admin'),
   loading: () => <RctPageLoader/>
});
const AsyncUserManagementSurveyorComponent = Loadable({
   loader: () => import('Routes/users/user-management/surveyor'),
   loading: () => <RctPageLoader/>
});
export {
   AsyncHomeDashboardComponent,
   AysncTasksComponent,
   AsyncAdminLoginComponent,
   AsyncUsersListComponent,
   AsyncUserProfile1Component,
   AsyncUserManagementClientComponent,
   AsyncUserManagementAdminComponent,
   AsyncUserManagementSubAdminComponent,
   AsyncUserManagementSurveyorComponent,
   AsyncUserProfileComponent
};
