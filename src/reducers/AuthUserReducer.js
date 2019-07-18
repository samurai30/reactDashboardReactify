/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER, CHECK_USER_LOGIN
} from 'Actions/types';

/**
 * initial auth user
 */
const INIT_STATE = {
    user_id: null,
    loading: false,
    token: null,
    isAuthenticated: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case LOGIN_USER:
            return { ...state, loading: true };

        case LOGIN_USER_SUCCESS:
            return { ...state,
                loading: false,
                user_id: action.user_id,
                token: action.token,
                isAuthenticated: true};

        case LOGIN_USER_FAILURE:
            return { ...state, loading: false };

        case LOGOUT_USER:

            return { ...state, user_id: null,token:null,isAuthenticated:false };
   

        default: return { ...state };
    }
}
