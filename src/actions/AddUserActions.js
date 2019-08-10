import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";
import {SubmissionError} from "redux-form";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  PROFILE_PIC_DELETE,
  PROFILE_PIC_DELETE_REQUEST,
  PROFILE_PIC_ERROR,
  PROFILE_PIC_REQUEST,
  PROFILE_PIC_UPLOADED,
  USER_FETCH_ERROR, USER_FETCH_ERROR_CREATE,
  USER_FETCH_REQUEST,
  USER_FETCH_REQUEST_CREATE,
  USER_FETCH_SUCCESS,
  USER_FETCH_SUCCESS_CREATE, USER_PAGINATION, USER_PAGINATION_RESET
} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const AddUserRequest = (values,prop) =>{
  return (dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.post('/users',values,true).then(response =>{
      dispatch({type:ADD_USER_SUCCESS});
      dispatch(getUsersManage('/users/all-users'));
      NotificationManager.success("User Added");
    }).catch(error =>{
      if (error.message === 'Unauthorized'){
        NotificationManager.error("Session Timed out");
        dispatch(prop.fetchUserError);
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


export const profilePicUpload = (file,prop) =>{
  return (dispatch) =>{
      dispatch(profilePicUploadRequest());
      return api.upload('/images/user',file).then(response => dispatch(profilePicUploaded(response)))
          .catch(error => {
            if (error.message === 'Unauthorized'){
              NotificationManager.error("Session Timed out");
              dispatch(prop.fetchUserError);
            }
            dispatch(profilePicUploadError())})
  }
};
export const profilePicDeelteRequest = () =>{
  return{
    type:PROFILE_PIC_DELETE_REQUEST
  }
};

export const profilePicDelete = (url) =>{
  return(dispatch) =>{
    dispatch(profilePicDeelteRequest());
    return api.delete(url).then(response =>{
      return dispatch({type:PROFILE_PIC_DELETE})
    }).catch(error =>{
      if (error.message === 'Unauthorized'){

        NotificationManager.error("Session Timed out");

      }
    })

  }
};
let deParam = function (querystring) {
  // remove any preceding url and split
  querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = querystring.length - 1; i >= 0; i--) {
    pair = querystring[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
};
export const getUsersManage = (url) => {
  return(dispatch) =>{
    dispatch({type:USER_FETCH_REQUEST_CREATE});
    return api.get(url,true)
        .then(response => {
          dispatch({type:USER_FETCH_SUCCESS_CREATE,data:response['hydra:member']});
          if(response['hydra:view']){
            const page = deParam(response['hydra:view']['@id']);
            if (page['page']){
              dispatch(paginationData(response['hydra:view'],response['hydra:totalItems'],page['page']))
            }else {
              dispatch({type:USER_PAGINATION_RESET});
            }
          }

        })
        .catch(error => {
          dispatch({type:USER_FETCH_ERROR_CREATE});
          if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            this.props.dispatch(this.props.fetchUserError);
          }
        });
  }
};

export const paginationData = (paginationData,pageCount,currentPage) =>({
  type:USER_PAGINATION,
  paginationData:paginationData,
  pageCount:pageCount,
  currentPage:currentPage
});