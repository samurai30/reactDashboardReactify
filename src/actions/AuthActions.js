import {api} from "Api";
import {SubmissionError} from 'redux-form'
import {
    CHECK_USER_LOGIN,
    LOGIN_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    USER_FETCH_REQUEST, USER_FETCH_SUCCESS
} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const userLoginAttempt = (username,password) =>{
    return(dispatch) => {
        dispatch({type:LOGIN_USER});
        return api.post('/login_check',{username,password},false).then(
            response => {
                dispatch(userLoginSuccess(response.token,response.id));
                ;
            }).catch(error => {
            dispatch({type:LOGIN_USER_FAILURE});
            NotificationManager.error("Did you forget something?");
            throw new SubmissionError({_error: "Username or Password Invalid"});
                            });
    }

};

export const userLoginSuccess = (token,user_id) =>{
    return{
        type: LOGIN_USER_SUCCESS,
        token,
        user_id
    }
};

export const userLogoutAction  = () =>({
    type: LOGOUT_USER
});

export const fetchUserRequest = () =>({
    type: USER_FETCH_REQUEST
});

export const userFetchReceived = (userId,userData)=> ({
    type: USER_FETCH_SUCCESS,
    userId,
    userData
});

export const fetchUserDetails = (userId) =>{
    return(dispatch) =>{
        dispatch(fetchUserRequest);
        return api.get(`/users/${userId}`,true).then(response=>{
            dispatch(userFetchReceived(response.id,response));
        }).catch()
    }
};