import axios from 'axios';
import { 
    GET_BACKLOG,
    GET_PROJECT_TASK,
    DELETE_BACKLOG
 } from './types';

 const GET_BACKLOG_ROUTE = "http://localhost:8080/api/v1/backlog/POST";

 export const getBacklog = () => async dispatch => {
    try{
        const res = await axios.get(GET_BACKLOG_ROUTE);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });

    }catch(error){
       console.error(error);
    }
}

export const updateTask = (task) => async dispatch => {
    try{
        const res = await axios.patch(GET_BACKLOG_ROUTE, task);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });

    }catch(error){
       console.error(error);
    }
} 