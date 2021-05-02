import {
    GET_BACKLOG,
    GET_PROJECT_TASK,
    DELETE_BACKLOG,
    SET_PROJECT_TASK,
} from '../actions/types';

const initial_state = {
    project_tasks: [],
    project_task: {}
}

// eslint-disable-next-line 
export default (state = initial_state, action) => {
    switch(action.type){
        case GET_BACKLOG:
            return { 
                ...state, 
                project_tasks: action.payload.project_tasks, 
                next_sequence: action.payload.next_sequence 
            };
        
        case GET_PROJECT_TASK:
            return { ...state, project_task: action.payload };
        
        case SET_PROJECT_TASK:
            return { ...state, project_task: action.payload };
        
        case DELETE_BACKLOG:
            return { ...state };
        
        default:
            return state;
    }
}