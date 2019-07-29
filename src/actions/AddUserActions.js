import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";
import {SubmissionError,reset} from "redux-form";
import {ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const AddUserRequest = (values) =>{
  return (dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.post('/users',values,true).then(response =>{
      dispatch({type:ADD_USER_SUCCESS});
      NotificationManager.success("User Added");
    }).catch(error =>{
      dispatch({type:ADD_USER_FAILURE});
      throw new SubmissionError(parseApiErrors(error));
    });
  }
};


