// sidebar nav links
export default {
   category1: [
      {
         "menu_title": "sidebar.dashboard",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.home",
               "new_item": false,
               "path": "/app/dashboard/home",
            }
         ]
      }
   ],
   category2: [
      {
         "menu_title": "sidebar.tasks",
         "menu_icon": "zmdi zmdi-view-dashboard",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.approved",
               "new_item": false,
               "path": "/dashboard/tasks/approved",
            },
            {
               "menu_title": "sidebar.pending",
               "new_item": false,
               "path": "/dashboard/tasks/pending",
            }
         ]
      }
   ]
}
