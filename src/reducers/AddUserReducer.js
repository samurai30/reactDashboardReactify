import {
    ADD_USER_FAILURE, ADD_USER_PROP,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    PROFILE_PIC_DELETE,
    PROFILE_PIC_DELETE_REQUEST,
    PROFILE_PIC_ERROR,
    PROFILE_PIC_REQUEST,
    PROFILE_PIC_UPLOADED, USER_CREATE_DELETE_FAILURE, USER_CREATE_DELETE_REQUEST, USER_CREATE_DELETE_SUCCESS,
    USER_FETCH_ERROR_CREATE,
    USER_FETCH_REQUEST_CREATE,
    USER_FETCH_SUCCESS_CREATE, USER_PAGINATION, USER_PAGINATION_RESET
} from "Actions/types";

export default (state = {
    addUserLoader: false,
    profilePicUploaded:false,
    profilePicImage: null,
    users: null,
    loading:false,
    paginationHydra:null,
    HydraPageCount:null,
    CurrentPage:null
                },
action) =>{
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {...state, addUserLoader: true};
        case ADD_USER_SUCCESS:
            return {...state,addUserLoader:false,profilePicImage:null,profilePicUploaded:false};
        case ADD_USER_FAILURE:
            return {...state,addUserLoader:false,profilePicImage:(state.profilePicImage)?state.profilePicImage:null};
        case PROFILE_PIC_REQUEST:
            return { ...state,addUserLoader: true};
        case PROFILE_PIC_UPLOADED:
            return{...state,addUserLoader:false,profilePicImage: action.profilePicImage,profilePicUploaded: true};
        case PROFILE_PIC_ERROR:
            return{...state,addUserLoader:false,profilePicImage:null,profilePicUploaded: false};
        case PROFILE_PIC_DELETE_REQUEST:
            return{...state,addUserLoader:true};
        case PROFILE_PIC_DELETE:
            return{...state,addUserLoader:false,profilePicImage:null,profilePicUploaded: false};
        case USER_FETCH_REQUEST_CREATE:
            return {...state,loading: true,users: null};
        case USER_FETCH_SUCCESS_CREATE:
            return {...state,loading: false,users: action.data};
        case USER_FETCH_ERROR_CREATE:
            return {...state,loading: false,users: null};
        case USER_PAGINATION:
            return {...state,paginationHydra:action.paginationData,HydraPageCount:action.pageCount,CurrentPage:action.currentPage};
        case USER_PAGINATION_RESET:
            return {...state,paginationHydra: null,HydraPageCount: null,CurrentPage: null};
        case USER_CREATE_DELETE_REQUEST:
            return {...state,loading: true};
        case USER_CREATE_DELETE_SUCCESS:
            return {...state,loading: false};
        case USER_CREATE_DELETE_FAILURE:
            return {...state,loading: false};
        case ADD_USER_PROP:

            return {...state,users: action.data};
        default:
            return{...state}
    }
}