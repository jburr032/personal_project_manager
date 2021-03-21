import { FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Container, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { createProject } from '../../redux/actions/projectActions';
import { useDispatch } from 'react-redux';
const AddProject = ({ history }) => {
    const [projectFields, setFields] = useState({
        projectName: "",
        projectIdentified: "",
        description: "",
        start_date: new Date(),
        end_date: ""
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setFields(fields => ({ ...fields, [event.target.name]:event.target.value  }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createProject(projectFields, history));
    }

    return (
        <Container>
            <Text marginTop="15px" marginBottom="25px" marginLeft="150px" fontSize="30px">Creat/Edit Project</Text>
            <form onSubmit={handleSubmit}>
                <Input
                    name="projectName"
                    value={projectFields.name}
                    onChange={handleChange}
                    placeholder="Project name"
                    size="md"
                    marginBottom="15px"
                />
                <Input
                    name="projectIdentified"
                    value={projectFields.id}
                    onChange={handleChange}
                    placeholder="Project ID"
                    size="md"
                    marginBottom="15px"
                />
                <Textarea
                    name="description"
                    value={projectFields.description}
                    onChange={handleChange}
                    placeholder="Project description"
                    size="md"
                    marginBottom="25px"
                />
                <FormLabel>Start date</FormLabel>
                <Input
                    type="date"
                    name="start_date"
                    value={projectFields.name}
                    onChange={handleChange}
                    size="md"
                    marginBottom="15px"
                />
                <FormLabel>Est. end date</FormLabel>            
                <Input
                    type="date"
                    name="end_date"
                    value={projectFields.id}
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

export default connect(
    null, { createProject }
)(AddProject);
