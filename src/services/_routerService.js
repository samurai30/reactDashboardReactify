
import Dashboard from 'Routes/dashboard';
import Crm from 'Routes/crm';
import Tasks from "Routes/Services";


export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'crm',
      component: Crm
   },
   {
      path: 'services',
      component: Tasks
   }
]
