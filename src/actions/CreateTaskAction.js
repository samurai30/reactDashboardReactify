import {api} from "Api/index";
import {
    CREATE_TASK_CATEGORY_FAILURE,
    CREATE_TASK_CATEGORY_REQUEST,
    CREATE_TASK_CATEGORY_SUCCESS, CREATE_TASK_FORM_FAILURE,
    CREATE_TASK_FORM_REQUEST,
    CREATE_TASK_FORM_SUCCESS
} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const getFormData = (url) =>{
  return(dispatch)=>{
      dispatch({type:CREATE_TASK_FORM_REQUEST});
      return api.get(url).then(response =>{
            dispatch(successFormData(response['hydra:member']))
      }).catch(error =>{
          if (error.message === 'Unauthorized'){
              NotificationManager.error("Session Timed out");

          }
          dispatch({type:CREATE_TASK_FORM_FAILURE})
      });
  }
};
export const getCategoryData = (url) =>{
    return(dispatch)=>{
        dispatch({type:CREATE_TASK_CATEGORY_REQUEST});
        return api.get(url).then(response =>{
            dispatch(successCategoryData(response['hydra:member']))
        }).catch(error =>{
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }
            dispatch({type:CREATE_TASK_CATEGORY_FAILURE})
        });
    }
};

export const successFormData = (formData) =>({
    type: CREATE_TASK_FORM_SUCCESS,
    data:formData

});
export const successCategoryData = (catData) =>({
    type: CREATE_TASK_CATEGORY_SUCCESS,
    data:catData

});