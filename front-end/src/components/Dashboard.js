import { Center, Text } from '@chakra-ui/layout';
import React from 'react';
import ProjectItem from './project/ProjectItem';
import CreateProjectBtn from './project/CreateProjectBtn';

const Dashboard = () => {
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
                <Text fontSize="50px">Projects</Text> 
            </Center>
            <ProjectItem />
        </div>
    )
}

export default Dashboard;