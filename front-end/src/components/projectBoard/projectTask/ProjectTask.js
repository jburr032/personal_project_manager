import React from 'react'
import { 
    Text, 
    Box 
} from '@chakra-ui/react';
import { 
    ArrowDownIcon, 
    ArrowUpIcon 
} from '@chakra-ui/icons';
import { dijkstraConstants } from '../../../dnd/djikstraConstants';
import { useDrag } from 'react-dnd';
import { setTaskToEdit, updateTask } from '../../../redux/actions/backLogActions';
import { useDispatch } from 'react-redux';

const handleTaskMove = (task, tasks, monitor, dispatch, setQueue) => {    
    const laneType = monitor?.getDropResult()?.laneType?.toUpperCase();
    let updatedTask = {};

    const updatedTasks = tasks.map(t => {
        if(t.projectSequence === task.projectSequence){
            const update = { ...t, status: laneType !== undefined ? laneType : t.status };
            updatedTask = update;
            return update
        }else{
            return t;
        }
    });

    dispatch(updateTask(updatedTask));
    setQueue(updatedTasks);

}
const ProjectTask = ({ task, setQueue, setTaskForm, taskIndex }) => {
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: dijkstraConstants.TODO,
        item: task,
        end: (item, monitor) => setQueue(
            prev => handleTaskMove(task, prev, monitor, dispatch, setQueue)
        ),
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))

    return (
        
            <Box
                ref={drag}
                border="1px solid black"
                textAlign="left"
                borderRadius="md" 
                paddingTop="10px"
                paddingLeft="10px"
                paddingBottom="15px"
                paddingRight="25px"
                marginBottom="5px"
                height="150px"
                backgroundColor="white"
                onClick={() => {
                    dispatch(setTaskToEdit(task));
                    setTaskForm(prev => !prev);
                }}
            >
                <Text height="72px">
                    {
                        task.summary.length > 150 ? 
                            `${task.summary.slice(0,150)}...` : task.summary
                    }
                </Text>
                <Text>
                    {
                        task.priority === 1 || task.priority === "high" ? 
                        <ArrowUpIcon color="red"/> : task.priority === 3 || task.priority === "low" ? 
                        <ArrowDownIcon color="blue"/> : <ArrowUpIcon color="orange"/>
                    }
                </Text>              
                <Text color="grey">{task.projectSequence}</Text>
            </Box>
        
    )
}

export default ProjectTask
