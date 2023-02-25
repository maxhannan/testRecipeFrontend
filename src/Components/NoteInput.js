import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

const NoteInput = ({newNote, setNewNote, handleSubmit}) => {
  
  return ( 
    <InputGroup size='lg'>
    <Input
      pr='4.5rem'
      placeholder='Add a note...'
      value ={newNote}
      onChange={(e) => setNewNote(e.target.value)}
    />
    <InputRightElement width='4.5rem'>
      <Button onClick = {handleSubmit} colorScheme='pink'  size='md' >
       Add
      </Button>
    </InputRightElement>
  </InputGroup>
   );
}
 
export default NoteInput;