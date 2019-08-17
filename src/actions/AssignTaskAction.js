import {api} from "Api/index";
import {
    ASSIGN_TASK_GET_DEPT_FAILURE,
    ASSIGN_TASK_GET_DEPT_REQUEST, ASSIGN_TASK_GET_DEPT_SUCCESS,
    ASSIGN_TASK_GET_TASK_FAILURE,
    ASSIGN_TASK_GET_TASK_REQUEST,
    ASSIGN_TASK_GET_TASK_SUCCESS, ASSIGN_TASK_REMOVE_DEPT, ASSIGN_TASK_SET_DEPT, ASSIGN_TASK_SET_DEPT_REQUEST
} from "Actions/types";
import {NotificationManager} from "react-notifications";


export const getTaskToAssign = (url) => (dispatch) => {
  dispatch({type:ASSIGN_TASK_GET_TASK_REQUEST});
    return api.get(url,true).then(response =>{
      dispatch({type: ASSIGN_TASK_GET_TASK_SUCCESS,data:response['hydra:member']})
  }).catch(error =>{
    dispatch({type:ASSIGN_TASK_GET_TASK_FAILURE});
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
  });
};

export const getDepartmentNames = (url) => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_GET_DEPT_REQUEST});
  return api.get(url).then(response =>{
            dispatch({type:ASSIGN_TASK_GET_DEPT_SUCCESS,data:response['hydra:member']})
  }).catch(error =>{
      dispatch({type:ASSIGN_TASK_GET_DEPT_FAILURE});
      if (error.message === 'Unauthorized'){
          NotificationManager.error("Session Timed out");
          window.location.reload();
      }
  });
};

export const setSelected = (value) => (dispatch) =>{
  dispatch({type:ASSIGN_TASK_SET_DEPT,data:value})
};
export const removeSelected = () => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_REMOVE_DEPT})
};