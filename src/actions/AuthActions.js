import {requests} from "Api";
import {SubmissionError} from "redux-form";
import {LOGIN_USER, LOGIN_USER_SUCCESS} from "Actions/types";


export const userLoginAttempt = (username,password) =>{
    return(dispatch) => {
        dispatch({type:LOGIN_USER});
        return requests.post('/login_check',{username,password},false).then(
            response => {
                dispatch(userLoginSuccess(response.token,response.id))
            }).catch(error => {
                throw new SubmissionError({
                    _error:"Username or Password Invalid",
                });
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

