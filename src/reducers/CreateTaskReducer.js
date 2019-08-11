import {
    CREATE_TASK_CATEGORY_FAILURE,
    CREATE_TASK_CATEGORY_REQUEST, CREATE_TASK_CATEGORY_SUCCESS,
    CREATE_TASK_FAILURE, CREATE_TASK_FORM_FAILURE,
    CREATE_TASK_FORM_REQUEST,
    CREATE_TASK_FORM_SUCCESS,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS, FETCH_TASK_REQUEST
} from "Actions/types";

export default (state ={
    taskData:null,
    taskLoading:false,
    formData: null,
    categoryData:null,
    formSelectData:null,
    catSelectDat:null

},action) =>{
    switch (action.type) {
        case FETCH_TASK_REQUEST:
            return {...state,taskLoading:true};
        case CREATE_TASK_REQUEST:
            return  {...state,taskLoading:true};
        case CREATE_TASK_SUCCESS:
            return {...state,taskLoading:false,taskData: action.data};
        case CREATE_TASK_FAILURE:
            return {...state,taskLoading:false,taskData:null};
        case CREATE_TASK_FORM_REQUEST:
            return {...state,taskLoading:true};
        case CREATE_TASK_FORM_SUCCESS:
            return {...state,taskLoading:false,formData: action.data,formSelectData:action.selectData};
        case CREATE_TASK_FORM_FAILURE:
            return {...state,taskLoading:false,formData: null,formSelectData:null};
        case CREATE_TASK_CATEGORY_REQUEST:
            return {...state,taskLoading:true};
        case CREATE_TASK_CATEGORY_SUCCESS:
            return {...state,taskLoading:false,categoryData: action.data,catSelectDat: action.selectData};
        case CREATE_TASK_CATEGORY_FAILURE:
            return {...state,taskLoading:false,categoryData: null,catSelectDat:null};
        default:
            return {...state}
    }
}