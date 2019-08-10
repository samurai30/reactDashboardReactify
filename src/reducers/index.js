/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import authUserReducer from './AuthUserReducer';
import addUserReducer from './AddUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import ecommerceReducer from './EcommerceReducer';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import createTask from './CreateTaskReducer'
import formBuilderReducer from './UploadFormBuilder'
import {ADD_USER_SUCCESS, LOGIN_USER_FAILURE} from "Actions/types";
const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  feedback: feedbacksReducer,
  ecommerce: ecommerceReducer,
  auth: authUserReducer,
  addUser: addUserReducer,
  formBuilderRed : formBuilderReducer,
  createTaskReducer:createTask,
  form: formReducer.plugin({
    addUserForm: (state,action)=>{
      switch (action.type) {
        case ADD_USER_SUCCESS:
          return undefined;
        default:
          return state;

      }
    },
    adminLoginForm: (state,action) =>{
      switch (action.type) {
        case LOGIN_USER_FAILURE:
          return undefined;
        default:
          return state;
      }
    }
  }),
  router: routerReducer
});

export default reducers;
