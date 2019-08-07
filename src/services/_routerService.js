
import Dashboard from 'Routes/dashboard';
import Tasks from "Routes/tasks";
import Users from "Routes/users";
import Maps from "Routes/maps";
import FormBuilder from "Routes/form-builder";


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
   },
   {
      path: 'location',
      component: Maps
   },
   {
      path: 'form-builder',
      component: FormBuilder
   }
]
