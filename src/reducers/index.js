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
const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  feedback: feedbacksReducer,
  ecommerce: ecommerceReducer,
  auth: authUserReducer,
  addUser: addUserReducer,
  form: formReducer,
  router: routerReducer
});

export default reducers;
