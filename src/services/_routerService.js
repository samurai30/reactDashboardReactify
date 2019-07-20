
import Dashboard from 'Routes/dashboard';
import Tasks from "Routes/tasks";
import Users from "Routes/users";


export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'tasks',
      component: Tasks
   },
   {
      path: 'users',
      component: Users
   }
]
