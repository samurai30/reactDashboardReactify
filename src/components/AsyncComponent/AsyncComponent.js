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

const AsyncUserManagementCreateUserComponent = Loadable({
   loader: () => import('Routes/users/user-management/create-user'),
   loading: () => <RctPageLoader/>
});
const AsyncSessionPage404Component = Loadable({
   loader: () => import('Routes/session/404'),
   loading: () => <RctPageLoader/>
});
const AsyncSessionPage500Component = Loadable({
   loader: () => import('Routes/session/500'),
   loading: () => <RctPageLoader/>
});

export {
   AsyncHomeDashboardComponent,
   AysncTasksComponent,
   AsyncAdminLoginComponent,
   AsyncUsersListComponent,
   AsyncUserProfile1Component,
   AsyncUserManagementCreateUserComponent,
   AsyncUserProfileComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component
};
