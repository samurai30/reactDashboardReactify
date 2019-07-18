import {LOGIN_USER_SUCCESS,LOGOUT_USER} from "Actions/types";
import {requests} from "Api";


export const tokenMiddleWare = store => next => action =>{
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            window.localStorage.setItem('jwtToken',action.token);
            window.localStorage.setItem('user_id',action.user_id);
            requests.setToken(action.token);
            break;
        case LOGOUT_USER:
            window.localStorage.setItem('jwtToken',null);
            window.localStorage.setItem('user_id',null)
            requests.setToken(null)
            break;
    }
    next(action)
};