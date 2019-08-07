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

//tasks
const AysncTasksApprovedComponent = Loadable({
   loader: () => import('Routes/tasks/approved'),
   loading : () => <RctPageLoader/>
});
const AysncTasksPendingComponent = Loadable({
   loader: () => import('Routes/tasks/pending'),
   loading : () => <RctPageLoader/>
});
const AysncTasksRejectedComponent = Loadable({
   loader: () => import('Routes/tasks/rejected'),
   loading : () => <RctPageLoader/>
});
const AysncAssignTaskComponent = Loadable({
   loader: () => import('Routes/tasks/AssignTasks'),
   loading : () => <RctPageLoader/>
});
const AysncCreateTaskComponent = Loadable({
   loader: () => import('Routes/tasks/CreateTasks'),
   loading : () => <RctPageLoader/>
});
const AysncCompletedTaskComponent = Loadable({
   loader: () => import('Routes/tasks/completed'),
   loading : () => <RctPageLoader/>
});
//login
const AsyncAdminLoginComponent = Loadable({
   loader: () => import('Routes/login'),
   loading: () => <RctPageLoader/>
});
//user management
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

//error
const AsyncSessionPage404Component = Loadable({
   loader: () => import('Routes/session/404'),
   loading: () => <RctPageLoader/>
});
const AsyncSessionPage500Component = Loadable({
   loader: () => import('Routes/session/500'),
   loading: () => <RctPageLoader/>
});
//location
const AsyncGooleMapsComponent = Loadable({
   loader: () => import('Routes/maps/google-map'),
   loading: () => <RctPageLoader/>
});
const AsyncFormBuilderComponent = Loadable({
   loader: () => import('Routes/form-builder/builder'),
   loading: () => <RctPageLoader/>
});


export {
   AsyncHomeDashboardComponent,
   AsyncFormBuilderComponent,
   AysncCompletedTaskComponent,
   AsyncGooleMapsComponent,
   AysncTasksApprovedComponent,
   AysncCreateTaskComponent,
   AysncAssignTaskComponent,
   AysncTasksPendingComponent,
   AysncTasksRejectedComponent,
   AsyncAdminLoginComponent,
   AsyncUsersListComponent,
   AsyncUserProfile1Component,
   AsyncUserManagementCreateUserComponent,
   AsyncUserProfileComponent,
   AsyncSessionPage404Component,
   AsyncSessionPage500Component
};
