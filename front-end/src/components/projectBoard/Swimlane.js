import React from 'react';
import { useDrop } from 'react-dnd';
import { List, ListItem } from '@chakra-ui/react';
import EmptyProjectTask from './projectTask/EmptyProjectTask';
import ProjectTask from './projectTask/ProjectTask';
import { dijkstraConstants, DUMMY_CONST } from '../../dnd/djikstraConstants';

const Swimlane = ({ children, laneType, laneTitle }) => {
    const [collectedProps, drop] = useDrop(() => ({
        drop: () => ({ laneType }),
        // hover: (item, monitor) => console.log(item),
        accept: [dijkstraConstants.TODO, dijkstraConstants.INPROGRESS, dijkstraConstants.DONE]
      }));

    return (
        <List
            ref={drop}
            border="1px solid grey" 
            padding="5px" 
            backgroundColor="#4745452e"
            textAlign="center"
            height="656">
            <ListItem>
                {laneTitle}
            </ListItem>
            {children} 
        </List>
    )
}

export default Swimlane;
