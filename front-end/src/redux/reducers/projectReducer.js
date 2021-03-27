import { GET_PROJECTS, GET_SINGLE_PROJECT, CLEAR_SINGLE_PROJECT } from '../actions/types';

const initial_state = {
    project: {},
    projects: []
};

// eslint-disable-next-line 
export default (state = initial_state, action) => {
    switch(action.type){
        case GET_PROJECTS:
            return { ...state, projects: action.payload };
        
        case GET_SINGLE_PROJECT:
            return { ...state, project: action.payload }

        case CLEAR_SINGLE_PROJECT:
            return { ...state, project: {} }
        
        default:
            return state;
    }
}