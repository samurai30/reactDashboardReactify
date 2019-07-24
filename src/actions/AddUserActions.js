import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";
import {SubmissionError} from "redux-form";
import {ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "Actions/types";

export const AddUserRequest = (values) =>{
  return (dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.post('/users',values,true).then(response =>{
      dispatch({type:ADD_USER_SUCCESS});
      console.log(response)
    }).catch(error =>{
      dispatch({type:ADD_USER_FAILURE});
      throw new SubmissionError(parseApiErrors(error));

    });
  }
};

export const AddUserSuccess = () =>({
  type: ADD_USER_SUCCESS
});
