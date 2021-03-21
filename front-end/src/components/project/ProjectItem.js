import { Box, Grid, GridItem, Text, Container } from '@chakra-ui/layout'
import React from 'react'
import { Button } from '@chakra-ui/button';
import { CalendarIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'

const ProjectItem = () => {
    return (
        <Container maxWidth="867px">
            <Box backgroundColor="#8080801a">
                <Grid border="1px solid grey" height="200px" templateColumns="repeat(6, 1fr)" gap={3}>
                    <GridItem colSpan={1}>
                        <Text paddingLeft="3vw" paddingTop="10px">React</Text>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Text fontSize="4xl">React/Full stack</Text>
                        <Text>Project description of the project card in this project cart</Text>
                    </GridItem>
                    <GridItem fontSize="15px" colSpan={2} paddingTop="40px" paddingLeft="112px">
                        <Button leftIcon={<CalendarIcon />} colorScheme="blue" width="145px" marginBottom="10px">Board</Button>
                        <Button 
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
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" width="145px">Delete</Button>
                    </GridItem>
                </Grid>
            </Box>
        </Container>
        
    )
}

export default ProjectItem
