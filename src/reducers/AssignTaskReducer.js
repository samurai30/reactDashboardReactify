import {
    ASSIGN_TASK_GET_DEPT_FAILURE,
    ASSIGN_TASK_GET_DEPT_REQUEST,
    ASSIGN_TASK_GET_DEPT_SUCCESS, ASSIGN_TASK_GET_SURV_FAILURE,
    ASSIGN_TASK_GET_SURV_REQUEST,
    ASSIGN_TASK_GET_SURV_SUCCESS,
    ASSIGN_TASK_GET_TASK_FAILURE,
    ASSIGN_TASK_GET_TASK_REQUEST,
    ASSIGN_TASK_GET_TASK_SUCCESS
} from "Actions/types";

export default (state ={
    tasksData:null,
    loading:false,
    departmentData:null,
    deptLoading:false,
    surveyorData:null
},action) =>{
    switch (action.type) {
        case ASSIGN_TASK_GET_TASK_REQUEST:
            return {...state,loading: true};
        case ASSIGN_TASK_GET_TASK_SUCCESS:
            return {...state,loading: false,tasksData: action.data};
        case ASSIGN_TASK_GET_TASK_FAILURE:
            return {...state,loading: false,tasksData: null};
        case ASSIGN_TASK_GET_DEPT_REQUEST:
            return {...state,deptLoading: true};
        case ASSIGN_TASK_GET_DEPT_SUCCESS:
            return {...state,deptLoading: false,departmentData: action.data };
        case ASSIGN_TASK_GET_DEPT_FAILURE:
            return {...state,deptLoading: false,departmentData: null};
        case ASSIGN_TASK_GET_SURV_REQUEST:
            return {...state,loading: true};
        case ASSIGN_TASK_GET_SURV_SUCCESS:
            return {...state,loading: false,surveyorData: action.data};
        case ASSIGN_TASK_GET_SURV_FAILURE:
            return {...state,loading: false,surveyorData: null};
        default:
            return{...state}

    }
}