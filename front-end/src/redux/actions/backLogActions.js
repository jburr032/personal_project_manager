import axios from 'axios';
import { 
    GET_BACKLOG,
    SET_ERRORS,
    SET_PROJECT_TASK
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

export const setTaskToEdit = (task) => dispatch => {
    dispatch({
        type: SET_PROJECT_TASK,
        payload: task
    })
}

export const createTask = (task, projectIdentifier) => async dispatch => {
    const formattedTask = prepTask(task);

    try{
        await axios.post(BACKLOG_ROUTE + projectIdentifier, formattedTask);
        dispatch(getBacklog(projectIdentifier));
    
    }catch(err){
        console.log('HELLO!!', err.response.data);
        dispatch({
            type: SET_ERRORS,
            payload: err
        })
    }
}

// Includes updating status on drag and drop
export const updateTask = (task) => async dispatch => {
    try{
        const formattedTask = prepTask(task);
        await axios.patch(
            BACKLOG_ROUTE + 
            task.projectIdentifier + "/" + 
            task.projectSequence, formattedTask
        );
        dispatch(getBacklog(formattedTask.projectIdentifier));

    }catch(error){
       dispatch({
           type: SET_ERRORS,
           payload: error
       })
    }
} 

export const deleteTask = (task) => async dispatch => {
    try{
        await axios.delete(
            BACKLOG_ROUTE + 
            task.projectIdentifier + "/" + 
            task.projectSequence, task
        );

        dispatch(getBacklog(task.projectIdentifier));

    }catch(error){
       console.error(error);
    }
}