import React, { useState, useEffect } from 'react';
import { Button, Center, Text, CircularProgress, SimpleGrid } from '@chakra-ui/react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBacklog } from '../../redux/actions/backLogActions';
import Swimlane from './Swimlane';
import ProjectTask from './projectTask/ProjectTask';

export const LANE_TYPES_CONST = ["to_do", "in_progress", "done"];

const ProjectBoard = () => { 
    const dispatch = useDispatch();
    let { projects, backlog } = useSelector(state => state);
    const [project, setProject] = useState();
    const match = useRouteMatch();
    const [queue, setQueue] = useState([]);

    useEffect(() => {
        dispatch(getBacklog(match.params.id));
    }, [dispatch]);

    useEffect(() => {
        const [project] = projects.projects.filter(
            pr => pr.projectIdentified === match.params.id
        );
        setProject(project);
    }, []);

    useEffect(() => {
        setQueue(backlog.project_tasks);
    }, [backlog]);

    const sortTasks = (laneType) => {
        return queue
        ?.filter(task => laneType === task.status.toLowerCase())
        .map(task => <ProjectTask key={task.projectSequence} task={task} setQueue={setQueue} />)
    }
    
    console.log(queue)
    return (
        <div style={{ paddingRight: "215px", paddingLeft: "215px"}}>
            <Center> 
               <Text fontSize="30px">{project?.projectName} Project Board</Text> 
            </Center>

            <div style={{ float:"right" }}>
                <Button>
                    Add task
                </Button>
            </div>
            <hr style={{ marginTop: "55px" }}/>

                {backlog.project_tasks.length > 0 ? 
                    <SimpleGrid columns={3} spacing={2}>
                        <Swimlane 
                            laneType={LANE_TYPES_CONST[0]} 
                            laneTitle={LANE_TYPES_CONST[0]}
                        >
                            {sortTasks(LANE_TYPES_CONST[0])}
                        </Swimlane>
                        <Swimlane 
                            laneType={LANE_TYPES_CONST[1]} 
                            laneTitle={LANE_TYPES_CONST[1]}
                        >
                            {sortTasks(LANE_TYPES_CONST[1])}
                        </Swimlane>
                        <Swimlane 
                            laneType={LANE_TYPES_CONST[2]} 
                            laneTitle={LANE_TYPES_CONST[2]}
                        >
                            {sortTasks(LANE_TYPES_CONST[2])}
                        </Swimlane>
                 </SimpleGrid>
                    
                    :
                    <CircularProgress />
                }           
        </div>
    )
}

export default ProjectBoard
