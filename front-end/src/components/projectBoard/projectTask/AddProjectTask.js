import React, { useState } from 'react'
import { 
    Text, Container, Box,
    FormControl, Input, FormLabel,
    Textarea, Select, Button
} from '@chakra-ui/react';
import { dijkstraConstants } from '../../../dnd/djikstraConstants';
import { useDispatch } from 'react-redux';
import { getBacklog, createTask } from '../../../redux/actions/backLogActions';

const DEFAULT_TASK = (projectIdentifier) => ({
    summary: "",
    acceptanceCriteria: null,
    status: "TO_DO",
    priority: 3,
    dueDate: null,
    created_At: new Date(),
    updated_At: new Date(),
    projectIdentifier
});

const AddProjectTask = ({ projectIdentifier, projectSequence, closeForm }) => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState(DEFAULT_TASK(projectIdentifier));

    const handleSubmit = (e)  => {
        e.preventDefault();
        dispatch(createTask(newTask, projectIdentifier));

        closeForm(prev => !prev);
        setNewTask(DEFAULT_TASK(projectIdentifier));
        setTimeout(() => dispatch(getBacklog(projectIdentifier)), 250);
    };

    return (
        <Container>
            <Box
                paddingTop="9px"
                paddingLeft="20px"
                paddingRight="20px" 
                border="1px solid black"
                overflow="scroll" 
                height="656px">
                    <form onSubmit={handleSubmit}> 
                        <FormLabel display="inline-flex">New task: 
                            <Text 
                                marginLeft="5px" 
                                color="grey">
                                    {projectSequence}
                            </Text>
                        </FormLabel>
                        <FormControl 
                            id="task-summary" 
                            marginBottom="20px"
                            isRequired>
                                <FormLabel>Summary</FormLabel>
                                <Textarea
                                    value={newTask.summary} 
                                    name="summary" 
                                    onChange={
                                        ({target}) => 
                                            setNewTask(
                                                prev => ({
                                                    ...prev,
                                                    [target.name]: target.value 
                                                })
                                            )
                                    } 
                                />
                        </FormControl>
                        <FormControl 
                            id="task-status" 
                            marginBottom="20px">
                                <FormLabel>Status</FormLabel>
                                <Select 
                                    name="status"
                                    onChange={
                                        ({ target }) => setNewTask(
                                            prev => ({ 
                                                ...prev,
                                                [target.name]: target.value 
                                            })
                                        )
                                    }>
                                    <option 
                                        value={dijkstraConstants.TODO}>
                                            To do
                                    </option>
                                    <option 
                                        value={dijkstraConstants.INPROGRESS}>
                                            In progress
                                    </option>
                                    <option 
                                        value={dijkstraConstants.DONE}>
                                            Done
                                    </option>
                                </Select>
                        </FormControl>
                        <FormControl 
                            marginBottom="20px" 
                            id="task-priority">
                                <FormLabel>Priority</FormLabel>
                                <Select
                                    name="priority"
                                    onChange={
                                        ({ target }) => setNewTask(
                                            prev => ({ 
                                                ...prev,
                                                [target.name]: target.value 
                                            })
                                        )
                                    }
                                >
                                    <option value={"low"}>Low</option>
                                    <option value={"medium"}>Medium</option>
                                    <option value={"high"}>High</option>
                                </Select>
                        </FormControl>
                        <FormControl 
                            id="task-acceptance-criteria" 
                            marginBottom="20px">
                                <FormLabel>Acceptance criteria</FormLabel>
                                <Textarea 
                                    name="acceptanceCriteria" 
                                    onChange={
                                        ({target}) => 
                                            setNewTask(
                                                prev => ({
                                                    ...prev,
                                                    [target.name]: target.value 
                                                })
                                            )
                                    } 
                                
                                />
                        </FormControl>
                        <FormControl 
                        marginBottom="20px" 
                        id="task-due-date">
                            <FormLabel>Due date</FormLabel>
                            <Input                              
                                name="dueDate"
                                type="date"
                                onChange={
                                    ({target}) => 
                                        setNewTask(
                                            prev => ({
                                                ...prev,
                                                [target.name]: target.value 
                                            })
                                        )
                                } 
                                />
                        </FormControl>
                        <Button 
                            type="submit" 
                            float="right"
                            color="white"
                            backgroundColor="rgb(66 147 225)">
                            Submit
                        </Button>
                    </form>
            </Box>
        </Container>
    )
}

export default AddProjectTask
