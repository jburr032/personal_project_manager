import axios from 'axios';
import { GET_ERRORS, GET_PROJECTS, GET_SINGLE_PROJECT } from './types';

const CREATE_PROJECT_ROUTE = "http://localhost:8080/api/v1/project";
const GET_PROJECTS_ROUTE = "http://localhost:8080/api/v1/project/all"; 
const SINGLE_PROJECT_ROUTE =  "http://localhost:8080/api/v1/project/";
export const createProject = (project, history) => async dispatch => 
{
    try{
        await axios.post(CREATE_PROJECT_ROUTE, project);
        history.push("/dashboard");

    }catch(error){
        dispatch({ 
            type: GET_ERRORS, 
            payload: error.response.data
        })
    }
}

export const getProjects = () => async dispatch => {
    try{
        const res = await axios.get(GET_PROJECTS_ROUTE);
        console.log(res)
        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });

    }catch(error){
       console.error(error);
    }
}

export const getSingleProject = (projectId) => async dispatch => {
    try{
        const res = await axios.get(SINGLE_PROJECT_ROUTE + projectId);
        dispatch({
            type: GET_SINGLE_PROJECT,
            payload: res.data
        });

    }catch(error){
       console.error(error);
    }
}

export const deleteProject = (projectId) => async dispatch => {
    try{
        await axios.delete(SINGLE_PROJECT_ROUTE + projectId);
        dispatch(getProjects());

    }catch(error){
       console.error(error);
    }
}