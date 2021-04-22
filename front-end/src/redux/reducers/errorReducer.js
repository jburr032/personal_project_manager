import { GET_ERRORS, CLEAR_ERROR } from '../actions/types';

const initialState = {};

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch(action.type){
        case GET_ERRORS:
            return action.payload;
        
        case CLEAR_ERROR:
            return { ...state, errors: "" };
        
        default:
            return state;
    }
}