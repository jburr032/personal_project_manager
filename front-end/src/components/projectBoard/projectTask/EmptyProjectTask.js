import React from 'react';
import { Box } from '@chakra-ui/react';
import { dijkstraConstants } from '../../../dnd/djikstraConstants';

const EmptyProjectTask = ({ boardPosition }) => {
        // const [{ isOver }, drop] = useDrop(() => ({
    //     accept: dijkstraConstants.TODO,
    //     drop: () => moveKnight(x, y),
    //     collect: monitor => ({
    //       isOver: !!monitor.isOver(),
    //     }),
    //   }), [x, y])

    return (
        <Box
            height="154px"
            backgroundColor="blue"
        />
    )
}

export default EmptyProjectTask;
