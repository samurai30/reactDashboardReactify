import {
    CREATE_TASK_CATEGORY_FAILURE,
    CREATE_TASK_CATEGORY_REQUEST, CREATE_TASK_CATEGORY_SUCCESS,
    CREATE_TASK_FAILURE, CREATE_TASK_FORM_FAILURE,
    CREATE_TASK_FORM_REQUEST,
    CREATE_TASK_FORM_SUCCESS,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS
} from "Actions/types";

export default (state ={
    taskData:null,
    taskLoading:false,
    formLoading:false,
    catLoading:false,
    formData: null,
    categoryData:null

},action) =>{
    switch (action.type) {
        case CREATE_TASK_REQUEST:
            return  {...state,taskLoading:true};
        case CREATE_TASK_SUCCESS:
            return {...state,taskLoading:false};
        case CREATE_TASK_FAILURE:
            return {...state,taskLoading:false};
        case CREATE_TASK_FORM_REQUEST:
            return {...state,formLoading:true};
        case CREATE_TASK_FORM_SUCCESS:
            return {...state,formLoading:false,formData: action.data};
        case CREATE_TASK_FORM_FAILURE:
            return {...state,formLoading:false,formData: null};
        case CREATE_TASK_CATEGORY_REQUEST:
            return {...state,catLoading:true};
        case CREATE_TASK_CATEGORY_SUCCESS:
            return {...state,catLoading:false,categoryData: action.data};
        case CREATE_TASK_CATEGORY_FAILURE:
            return {...state,catLoading:false,categoryData: null};
        default:
            return {...state}
    }
}