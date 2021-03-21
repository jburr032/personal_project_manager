import React from 'react'
import { Button } from '@chakra-ui/button';
import { Link } from 'react-router-dom';
const CreateProjectBtn = () => {
    return (
        <Link to="/add-project">
            <Button>Create Project</Button>
        </Link>

    )
}

export default CreateProjectBtn
