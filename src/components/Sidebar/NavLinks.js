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
            }
         ]
      },
      {
         "menu_title": "sidebar.assignTasks",
         "new_item": false,
         "menu_icon": "zmdi zmdi-assignment",
         "path": "/app/tasks/assign-task",
         "child_routes": null
      },

   ],
   SupAdmincategory3: [
      {
         "menu_title": "sidebar.users",
         "menu_icon": "zmdi zmdi-accounts",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.userList",
               "new_item": false,
               "path": "/app/users/user-list",
            }
         ]
      },
      {
         "menu_title": "sidebar.userManagement",
         "new_item": false,
         "menu_icon": "zmdi zmdi-accounts-add",
         "child_routes":[
            {
               "menu_title": "sidebar.addUserClient",
               "new_item": false,
               "path": "/app/users/user-management/clients",
            },
            {
               "menu_title": "sidebar.addUserSurveyor",
               "new_item": false,
               "path": "/app/users/user-management/surveyor",
            },
            {
               "menu_title": "sidebar.addUserAdmin",
               "new_item": false,
               "path": "/app/users/user-management/admin",
            },
            {
               "menu_title": "sidebar.addUserSubAdmin",
               "new_item": false,
               "path": "/app/users/user-management/subadmin",
            }

         ]
      },

   ],
   SupAdmincategory4: [
      {
         "menu_title": "sidebar.formbuilder",
         "menu_icon": "zmdi zmdi-plus-circle",
         "new_item": false,
         "type_multi": null,
         "child_routes": [
            {
               "menu_title": "sidebar.client",
               "new_item": false,
               "path": "/app/users/approved",
            },
            {
               "menu_title": "sidebar.pending",
               "new_item": false,
               "path": "/app/tasks/pending",
            }
         ]
      }
   ]
}
