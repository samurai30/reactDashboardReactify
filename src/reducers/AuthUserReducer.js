/**
 * Auth User Reducers
 */
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER, USER_FETCH_SUCCESS, USER_FETCH_REQUEST, USER_FETCH_ERROR,
} from 'Actions/types';

/**
 * initial auth user
 */
const user_id =localStorage.getItem('user_id');
const token = localStorage.getItem('jwtToken');
const INIT_STATE = {
    user_id: user_id,
    loading: false,
    token: token,
    userData:null,
    isAuthenticated: (token !== null && user_id !== null)
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
        case USER_FETCH_REQUEST:
            return {...state,loading:true};
        case USER_FETCH_SUCCESS:
            return {...state,
                loading:false,
                userData: action.userData
            };
        case USER_FETCH_ERROR:
            return{
                ...state,
                user_id: null,token:null,isAuthenticated:false
            };
        default: return { ...state };
    }
}
