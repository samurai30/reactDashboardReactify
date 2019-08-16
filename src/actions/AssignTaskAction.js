import {api} from "Api/index";
import {ASSIGN_TASK_GET_TASK_FAILURE, ASSIGN_TASK_GET_TASK_REQUEST, ASSIGN_TASK_GET_TASK_SUCCESS} from "Actions/types";
import {NotificationManager} from "react-notifications";


export const getTaskToAssign = (url) => (dispatch) => {
  dispatch({type:ASSIGN_TASK_GET_TASK_REQUEST});
    return api.get(url,true).then(response =>{
      dispatch({type: ASSIGN_TASK_GET_TASK_SUCCESS,data:response['hydra:member']})
  }).catch(error =>{
    dispatch({type:ASSIGN_TASK_GET_TASK_FAILURE});
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
        }
  });
};