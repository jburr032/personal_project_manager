import React, { useState } from 'react';
import { 
    AlertDialog, 
    Button, 
    AlertDialogBody, 
    AlertDialogOverlay, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogHeader 
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../redux/actions/projectActions';

export default function DeleteAlertDialogue({ projectIdentified }){
    const [openDialogue, setIsOpen] = useState(false);
    const cancelRef = React.useRef();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProject(projectIdentified));
        setIsOpen(false);
    }
  
    return (
      <>
        <Button colorScheme="red" width="145px" onClick={() => setIsOpen(true)}>
          Delete
        </Button>
  
        <AlertDialog
          isOpen={openDialogue}
          leastDestructiveRef={cancelRef}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Project
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }