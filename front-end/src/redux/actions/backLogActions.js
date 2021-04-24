import axios from 'axios';
import { 
    GET_BACKLOG
 } from './types';

 export const BACKLOG_ROUTE = "http://localhost:8080/api/v1/backlog/";

 const prepTask = (task) => {
     switch(task.priority){
         case("high"):
            task.priority = 1;
            break;

         case("medium"):
            task.priority = 2;
            break;

         case("low"):
            task.priority = 3;
            break;
        
         default:
            return task;
     }

     return task
 }
 export const getBacklog = (project) => async dispatch => {
    try{
        const res = await axios.get(BACKLOG_ROUTE + project);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });

    }catch(error){
       console.error(error);
    }
}

export const createTask = (task, projectIdentifier) => async dispatch => {
    const formattedTask = prepTask(task);

    try{
        await axios.post(BACKLOG_ROUTE + projectIdentifier, formattedTask);
    
    }catch(err){
        console.error(err);
    }
}

export const updateTask = (task) => async dispatch => {
    try{
        await axios.patch(
            BACKLOG_ROUTE + "/" + 
            task.projectIdentifier + "/" + 
            task.projectSequence, task
        );

    }catch(error){
       console.error(error);
    }
} 