import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Container, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { createProject, getSingleProject } from '../../redux/actions/projectActions';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR, GET_ERRORS } from '../../redux/actions/types';
import { useParams } from 'react-router';
import { CLEAR_SINGLE_PROJECT } from "../../redux/actions/types";

const AddProject = ({ history }) => {
    const [projectFields, setFields] = useState({
        projectName: "PROJECT",
        projectIdentified: "",
        description: "My project",
        start_date:  "2021-03-15", //new Date().toDateString(),
        end_date: ""
    });
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const errors = useSelector(state => state.errors);
    const { project } = useSelector(state => state.projects);

    useEffect(() => {
       projectId && dispatch(getSingleProject(projectId));
    // eslint-disable-next-line 
    }, [projectId])

    useEffect(() => {
        setFields(project);
    // eslint-disable-next-line    
    }, [project])

    useEffect(() => {
        return () => { 
            dispatch({
            type: CLEAR_SINGLE_PROJECT
        });
    }
    // eslint-disable-next-line 
    }, [])

    const handleChange = (event) => {
        setFields(fields => ({ ...fields, [event.target.name]:event.target.value  }));
        errors[event.target.name] && dispatch({ type: CLEAR_ERROR, payload: event.target.name });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createProject(projectFields, history));
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }

    return (
        <Container>
            <Text marginTop="15px" marginBottom="25px" marginLeft="200px" fontSize="30px">
                {projectId ? "Edit Project" : "Create Project"}
            </Text>
            <form onSubmit={handleSubmit}>
                {errors.projectName &&
                    <Text position="absolute" top="106px" color="crimson">{errors.projectName}</Text>
                }
                <Input
                    isInvalid={errors.projectName}
                    errorBorderColor="crimson"
                    name="projectName"
                    value={projectFields.projectName}
                    onChange={handleChange}
                    placeholder="Project name*"
                    size="md"
                    marginBottom="38px"
                />
                {errors.projectIdentified &&
                    <Text  position="absolute" top="187px" color="crimson">{errors.projectIdentified}</Text>
                }
                <Input
                    isInvalid={errors.projectIdentified}
                    errorBorderColor="crimson"
                    isDisabled={projectId}
                    name="projectIdentified"
                    value={projectFields.id}
                    onChange={handleChange}
                    placeholder="Project ID*"
                    size="md"
                    marginBottom="38px"
                />
                {errors.description &&
                    <Text position="absolute" top="264px" color="crimson">{errors.description}</Text>
                }
                <Textarea
                    isInvalid={errors.description}
                    errorBorderColor="crimson"
                    name="description"
                    value={projectFields.description}
                    onChange={handleChange}
                    placeholder="Project description*"
                    size="md"
                    marginBottom="25px"
                />
                <FormLabel>Start date</FormLabel>
                <Input
                    type="date"
                    name="start_date"
                    value={projectFields.start_date}
                    onChange={handleChange}
                    isDisabled={projectId}
                    size="md"
                    marginBottom="15px"
                />
                <FormLabel>Est. end date</FormLabel>            
                <Input
                    type="date"
                    name="end_date"
                    value={projectFields.end_date}
                    onChange={handleChange}
                    size="md"
                    marginBottom="25px"
                />
                <div style={{ float: "right" }}>
                    <Button type="submit" colorScheme="blue" isLoading={false}>Submit</Button>
                </div>
            </form>
        </Container>
    )
}

export default AddProject
