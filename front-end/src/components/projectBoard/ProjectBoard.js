import React, { useState, useEffect } from 'react';
import { 
    Button, Center, Text, 
    Flex, SimpleGrid
} from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBacklog } from '../../redux/actions/backLogActions';
import Swimlane from './Swimlane';
import ProjectTask from './projectTask/ProjectTask';
import AddProjectTask from './projectTask/AddProjectTask';

export const LANE_TYPES_CONST = ["to_do", "in_progress", "done"];

const ProjectBoard = () => { 
    const dispatch = useDispatch();
    let { projects, backlog } = useSelector(state => state);
    const [project, setProject] = useState();
    const [showTaskForm, setTaskForm] = useState(false);
    const match = useRouteMatch();
    const [queue, setQueue] = useState([]);
    const [nextSequence, setNextSequenceNumber] = useState(0);

    useEffect(() => {
        dispatch(getBacklog(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        const [fetchedProject] = projects.projects.filter(
            pr => pr.projectIdentified === match.params.id
        );
        setProject(fetchedProject);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setQueue(backlog.project_tasks);
        setNextSequenceNumber(backlog.next_sequence)
    }, [backlog]);

    const sortTasks = (laneType) => {
        return queue
        ?.filter(task => laneType === task.status.toLowerCase())
        .map((task, index) => 
        <ProjectTask 
            key={`${index}-${task.projectSequence}`} 
            task={task} 
            setQueue={setQueue} />
        )
    }

    return (
        <>
            <div style={{ paddingRight: "215px", paddingLeft: "215px"}}>
                <Center> 
                <Text fontSize="30px">{project?.projectName} Project Board</Text> 
                </Center>

                <div style={{ float:"right" }}>
                    <Button onClick={() => setTaskForm(prev => !prev)}>
                        Add task
                    </Button>
                </div>
                <hr style={{ marginTop: "60px", marginBottom: "30px" }}/>
                    <Flex>
                        {backlog.project_tasks.length > 0 && 
                            <SimpleGrid columns={3} spacing={2}>
                                {
                                    LANE_TYPES_CONST.map(
                                        (lane, index) => 
                                        <Swimlane 
                                            key={`${index}-${lane}`}
                                            laneType={lane} 
                                            laneTitle={lane}>
                                            {sortTasks(lane)}
                                        </Swimlane>
                                    )
                                }
                        </SimpleGrid>
                        
                        }
                        {
                        showTaskForm &&  
                            <AddProjectTask
                                closeForm={setTaskForm}
                                projectIdentifier={match.params.id}
                                projectSequence={`${match.params.id}-${nextSequence}`}

                            />
                        }   
                    </Flex>
                        
            </div>
            
        </>
    )
}

export default ProjectBoard
