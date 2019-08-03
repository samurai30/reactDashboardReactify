import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";
import {SubmissionError,reset} from "redux-form";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  PROFILE_PIC_ERROR, PROFILE_PIC_REQUEST, PROFILE_PIC_SET,
  PROFILE_PIC_UPLOADED
} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const AddUserRequest = (values) =>{
  return (dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.post('/users',values,true).then(response =>{
      dispatch({type:ADD_USER_SUCCESS});
      NotificationManager.success("User Added");
    }).catch(error =>{
      if (error.message === 'Unauthorized'){
        NotificationManager.error("Session Timed out");
        this.props.dispatch(this.props.fetchUserError);
      }
      dispatch({type:ADD_USER_FAILURE});
      NotificationManager.error("Something is not right! Please check your form");
      throw new SubmissionError(parseApiErrors(error));

    });
  }
};

export const profilePicUploaded  = (data)=>{
  return{
    type:PROFILE_PIC_UPLOADED,
    profilePicImage: data
  }
};

export const profilePicUploadError = () => {
  return{
    type:PROFILE_PIC_ERROR
  }
};

export const profilePicUploadRequest = () =>{
  return{
    type:PROFILE_PIC_REQUEST
  }
};


export const profilePicUpload = (file) =>{
  return (dispatch) =>{
      dispatch(profilePicUploadRequest());
      return api.upload('/images/user',file).then(response => dispatch(profilePicUploaded(response)))
          .catch(error => {
            if (error.message === 'Unauthorized'){
              NotificationManager.error("Session Timed out");
              this.props.dispatch(this.props.fetchUserError);
            }
            dispatch(profilePicUploadError())})
  }
};

