import { Box, Grid, GridItem, Text, Container } from '@chakra-ui/layout'
import React from 'react'
import { Button } from '@chakra-ui/button';
import { CalendarIcon, EditIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router';
import DeleteAlertDialogue from './DeleteAlertDialogue';

const ProjectItem = ({ project }) => {
    const history = useHistory();

    return (
        <Container maxWidth="867px" marginBottom="40px">

            <Box backgroundColor="#8080801a">
                <Grid border="1px solid grey" height="200px" templateColumns="repeat(6, 1fr)" gap={3}>
                    <GridItem colSpan={1}>
                        <Text paddingLeft="3vw" paddingTop="10px">{project?.projectIdentified}</Text>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Text fontSize="4xl">{project?.projectName}</Text>
                        <Text>{project?.description}</Text>
                    </GridItem>
                    <GridItem fontSize="15px" colSpan={2} paddingTop="40px" paddingLeft="112px">
                        <Button 
                            leftIcon={<CalendarIcon />} 
                            colorScheme="blue" 
                            width="145px" 
                            marginBottom="10px"
                            onClick={() => history.push(`/projectBoard/${project.projectIdentified}`)}
                        >
                            Board
                        </Button>
                        <Button
                        onClick={() => history.push(`/update/${project.projectIdentified}`)} 
                        leftIcon={
                        <EditIcon 
                            marginBottom="3px" 
                            marginRight="-4px"
                            marginLeft="5px"/>} 
                            colorScheme="blue" 
                            width="145px" 
                            marginBottom="10px">
                                Update
                        </Button>
                        <DeleteAlertDialogue 
                            projectIdentified={project?.projectIdentified} />
                    </GridItem>
                </Grid>
            </Box>
        </Container>
        
    )
}

export default ProjectItem
