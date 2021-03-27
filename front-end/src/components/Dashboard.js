import { Center, Text } from '@chakra-ui/layout';
import React, { useEffect } from 'react';
import ProjectItem from './project/ProjectItem';
import CreateProjectBtn from './project/CreateProjectBtn';
import { getProjects } from '../redux/actions/projectActions';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => { 
    const dispatch = useDispatch();
    let { projects } = useSelector(state => state.projects);

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch])


    return (
        <div style={{ paddingRight: "215px", paddingLeft: "215px"}}>
            <Center> 
               <Text fontSize="30px">Welcome to the Project Dashboard!</Text> 
            </Center>

            <div style={{ float:"right" }}>
                <CreateProjectBtn />
            </div>
            <hr style={{ marginTop: "55px" }}/>
            <Center>
                <Text fontSize="50px" marginBottom="25px">Projects</Text> 
            </Center>
            {
                projects && projects?.map(pr =>  <ProjectItem project={pr} />)
            }
           
        </div>
    )
}

export default Dashboard;