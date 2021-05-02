import React, { useState, useEffect } from 'react'
import { 
    Text,
    FormControl, Input, FormLabel,
    Textarea, Select, Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerContent,
    DrawerCloseButton,
    DrawerOverlay,
    Drawer
} from '@chakra-ui/react';
import { dijkstraConstants } from '../../../dnd/djikstraConstants';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, deleteTask, updateTask, setTaskToEdit} from '../../../redux/actions/backLogActions';
import { format } from 'date-fns';


const DEFAULT_TASK = (projectIdentifier) => ({
    summary: "",
    acceptanceCriteria: "",
    status: "TO_DO",
    priority: 3,
    dueDate: null,
    created_At: new Date(),
    updated_At: new Date(),
    projectIdentifier,
    projectSequence: null
});

const AddProjectTask = ({ projectIdentifier, projectSequence, showTaskForm, setTaskForm }) => {
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState(DEFAULT_TASK(projectIdentifier));
    const { backlog, errors } = useSelector(state => state );

    useEffect(() => {    
        const savedTask = {...backlog.project_task};
    
        switch(savedTask.priority){
            case 1:
                savedTask.priority = "high";
                break;
            case 2:
                savedTask.priority = "medium";
                break;
            case 3:
                savedTask.priority = "low";
                break;
            default:
                break;

        }
        if(savedTask.dueDate){
            savedTask.dueDate = format(new Date(savedTask.dueDate), 'yyyy-MM-dd');
        }

        setNewTask(savedTask);

    }, [backlog])

    const handleSubmit = (e)  => {
        e.preventDefault();

        newTask.projectIdentifier ? 
            dispatch(updateTask(newTask, projectIdentifier)) : 
            dispatch(createTask(newTask, projectIdentifier))

        setTaskForm(prev => !prev);
        setNewTask(DEFAULT_TASK(projectIdentifier));
        dispatch(setTaskToEdit(DEFAULT_TASK(projectIdentifier)));

    };

    const handleClose = () => {
        dispatch(setTaskToEdit(DEFAULT_TASK(projectIdentifier)));
        setNewTask(DEFAULT_TASK(projectIdentifier));
        setTaskForm(prev => !prev);
    }
    return (
        <Drawer 
            isOpen={showTaskForm} 
            size="md" 
            onClose={handleClose} 
            closeOnEsc closeOnOverlayClick>
        <DrawerOverlay>
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader display="inline-flex">
                    {newTask?.projectSequence ? 'Editing task: ' : 'New task: '} 
                    <Text 
                        marginLeft="5px" 
                        color="grey">
                            {newTask?.projectSequence || projectSequence}
                    </Text>
                </DrawerHeader>
                <DrawerBody>
                    <form> 
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
                                    value={newTask?.status}
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
                                    value={newTask.priority}
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
                                    value={newTask.acceptanceCriteria}
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
                                value={newTask.dueDate}
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
                    </form>
                </DrawerBody>
                <DrawerFooter>
                <Button 
                    variant="outline" 
                    mr={3} 
                    onClick={handleClose}>
                    Cancel
                </Button>
                {
                    newTask?.projectSequence && 
                        <Button 
                            colorScheme="red" 
                            marginRight="10px"
                            onClick={() => {
                                dispatch(deleteTask(newTask));
                                handleClose();
                            }}>
                                    Delete
                        </Button>
                } 
                <Button 
                    colorScheme="blue" 
                    onClick={handleSubmit}
                    //isDisabled={!newTask.summary}
                    >
                        Submit
                </Button>
                </DrawerFooter>
            </DrawerContent>
        </DrawerOverlay>
        </Drawer>
    )
}

export default AddProjectTask
