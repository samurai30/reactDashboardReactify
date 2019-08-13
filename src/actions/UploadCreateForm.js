import {
    UPLOAD_FORM_BUILDER_FAILURE,
    UPLOAD_FORM_BUILDER_REQUEST,
    UPLOAD_FORM_BUILDER_RESET,
    UPLOAD_FORM_BUILDER_SUCCESS
} from "Actions/types";
import {api} from "Api/index";
import {NotificationManager} from "react-notifications";


export const uploadFormRequest = (data) =>{
 return(dispatch) =>{
   dispatch({type:UPLOAD_FORM_BUILDER_REQUEST});
  return api.post('/forms',data,true).then(response =>{
    dispatch({type:UPLOAD_FORM_BUILDER_SUCCESS });
    NotificationManager.success('Uploaded Successfully')

  }).catch(error =>{
    dispatch({type:UPLOAD_FORM_BUILDER_FAILURE});
      NotificationManager.error('Something went wrong');

  })
 }
};

export const uploadReset = () => {
    return(dispatch) =>{
        dispatch({type:UPLOAD_FORM_BUILDER_RESET})
    }
};