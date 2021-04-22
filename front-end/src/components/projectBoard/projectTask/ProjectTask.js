import React from 'react'
import { 
    Text, 
    Box 
} from '@chakra-ui/react';
import { 
    ArrowDownIcon, 
    ArrowUpIcon 
} from '@chakra-ui/icons';
import { dijkstraConstants, DUMMY_CONST } from '../../../dnd/djikstraConstants';
import { useDrag } from 'react-dnd';
import { updateTask } from '../../../redux/actions/backLogActions';
import { useDispatch } from 'react-redux';

const handleTaskMove = (task, tasks, monitor, dispatch) => {
    const laneType = monitor?.getDropResult()?.laneType;

    tasks.map(t => { 
        return {
            ...t,
            status: task.projectSequence === t.projectSequence && laneType  
                ? laneType : t.status
        }
    });
    dispatch(updateTask(task));
    return tasks;
}
const ProjectTask = ({ task, setQueue }) => {
    const dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(() => ({
        type: dijkstraConstants.TODO,
        item: task,
        end: (item, monitor) => setQueue(prev => handleTaskMove(task, [...prev], monitor, dispatch)),
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
            >
                <Text height="72px">
                    {
                        task.summary.length > 150 ? 
                            `${task.summary.slice(0,150)}...` : task.summary
                    }
                </Text>
                <Text>
                    {
                        task.priority === 1 ? 
                        <ArrowUpIcon color="red"/> : task.priority === 3 ? 
                        <ArrowDownIcon color="blue"/> : ""
                    }
                </Text>              
                <Text color="grey">{task.projectSequence}</Text>
            </Box>
        
    )
}

export default ProjectTask
