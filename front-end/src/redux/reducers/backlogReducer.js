import {
    GET_BACKLOG,
    GET_PROJECT_TASK,
    DELETE_BACKLOG
} from '../actions/types';

const initial_state = {
    project_tasks: [],
    project_task: {}
}

export default (state = initial_state, action) => {
    switch(action.type){
        case GET_BACKLOG:
            return { ...state, project_tasks: action.payload }
        
        case GET_PROJECT_TASK:
            return { ...state, project_task: action.payload }
        
        case DELETE_BACKLOG:
            return { ...state }
        
        default:
            return state;
    }
}