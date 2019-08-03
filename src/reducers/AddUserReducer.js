import {
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS, PROFILE_PIC_ERROR,
    PROFILE_PIC_REQUEST,
    PROFILE_PIC_UPLOADED
} from "Actions/types";

export default (state = {
    addUserLoader: false,
    profilePicUploaded:false,
    profilePicImage: null
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
        default:
            return{...state}
    }
}