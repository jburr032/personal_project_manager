import { Button } from '@chakra-ui/button';
import { Center, Text } from '@chakra-ui/layout';
import React from 'react'
import ProjectItem from './project/ProjectItem'

const Dashboard = () => {
    return (
        <div style={{ paddingRight: "215px", paddingLeft: "215px"}}>
            <Center> 
               <Text fontSize="30px">Welcome to the Project Dashboard!</Text> 
            </Center>

            <div style={{ float:"right" }}>
                <Button>Create Project</Button>
            </div>
            <hr style={{ marginTop: "55px" }}/>
            {/* <ProjectItem /> */}
            <Center>
                <Text fontSize="50px">Projects</Text> 
            </Center>
        </div>
    )
}

export default Dashboard;