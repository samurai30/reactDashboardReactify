import {ADD_USER_FAILURE, ADD_USER_REQUEST, ADD_USER_SUCCESS} from "Actions/types";

export default (state = {
    addUserLoader: false,
    userAdded: null,
                },
action) =>{
    switch (action.type) {
        case ADD_USER_REQUEST:
            return {...state, addUserLoader: true};
        case ADD_USER_SUCCESS:
            return {...state,addUserLoader:false,userAdded: true};
        case ADD_USER_FAILURE:
            return {...state,addUserLoader:false,userAdded:false};
        default:
            return{...state}
    }
}