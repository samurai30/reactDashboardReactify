import {ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "Actions/types";

export default (state = {
    addUserLoader: false,
                },
action) =>{
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {...state, addUserLoader: true};
        case ADD_USER_SUCCESS:
            return {...state,addUserLoader:false};
        case ADD_USER_FAILURE:
            return {...state,addUserLoader:false};
        default:
            return{...state}
    }
}