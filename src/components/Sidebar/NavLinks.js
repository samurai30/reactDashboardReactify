// sidebar nav links
export default {
   SupAdmincategory1: [
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
            },
            {
               "menu_title": "sidebar.settings",
               "new_item": false,
               "path": "/app/dashboard/settings",
            }
         ]
      }
   ],

   SupAdmincategory2: [
      {
         "menu_title": "sidebar.tasks",
         "menu_icon": "zmdi zmdi-comment-text-alt",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.approved",
               "new_item": false,
               "path": "/app/tasks/approved",
            },
            {
               "menu_title": "sidebar.pending",
               "new_item": false,
               "path": "/app/tasks/pending",
            },
            {
               "menu_title": "sidebar.rejected",
               "new_item": false,
               "path": "/app/tasks/rejected",
            },
            {
               "menu_title": "sidebar.completed",
               "new_item": false,
               "path": "/app/tasks/completed",
            },
            {
               "menu_title": "sidebar.inProgress",
               "new_item": false,
               "path": "/app/tasks/in-progress",
            }

         ]
      },
      {
         "menu_title": "sidebar.assignTask",
         "new_item": false,
         "menu_icon": "zmdi zmdi-assignment",
         "path": "/app/tasks/assign-task",
         "child_routes": null
      },
      {
         "menu_title": "sidebar.createTask",
         "new_item": false,
         "menu_icon": "zmdi zmdi-assignment",
         "path": "/app/tasks/create-task",
         "child_routes": null
      },

   ],
   SupAdmincategory3: [
      {
         "menu_title": "sidebar.userManagement",
         "new_item": false,
         "menu_icon": "zmdi zmdi-accounts-add",
         "child_routes":[
            {
               "menu_title": "sidebar.createUser",
               "new_item": false,
               "path": "/app/users/user-management/create-user",
            },
            {
               "menu_title": "sidebar.userList",
               "new_item": false,
               "path": "/app/users/user-list",
            }
         ]
      },

   ],
   SupAdmincategory4: [
      {
         "menu_title": "sidebar.formBuilder",
         "menu_icon": "zmdi zmdi-plus-circle",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.createForm",
               "new_item": false,
               "path": "/app/form-builder/create-form",
            }
         ]
      }
   ],
   SupAdmincategory5: [
      {
         "menu_title": "sidebar.location",
         "menu_icon": "zmdi zmdi-gps-dot",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.maps",
               "new_item": false,
               "path": "/app/location/map",
            }
         ]
      }
   ]
}
