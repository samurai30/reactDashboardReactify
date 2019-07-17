import {LOGIN_USER_SUCCESS} from "Actions/types";
import {requests} from "Api";


export const tokenMiddleWare = store => next => action =>{
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            window.localStorage.setItem('jwtToken',action.token);
            window.localStorage.setItem('user_id','user');
            requests.setToken(action.token);
            console.log("middleware",action.token)
    }
    next(action)
};