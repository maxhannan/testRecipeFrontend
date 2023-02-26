import {Box, Button, Container, Heading, Spinner, Stack, StackDivider} from "@chakra-ui/react";
import NoteCard from "../Components/NoteCard";
import NoteInput from "../Components/NoteInput";

const Feed = ({user, setUser, notes, newNote, setNewNote, handleSubmit, loading}) => {
  const handleLogout = ()=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }
  
  return ( 
    <Container paddingTop='10' maxW ='2xl'>
      
      <Stack divider={<StackDivider />} spacing='4'>
      <Box>
      <Heading>Hi {user.name}</Heading>
     
      </Box>
      <Button onClick={handleLogout}>Logout</Button>
      <NoteInput newNote ={newNote} setNewNote ={setNewNote} handleSubmit ={handleSubmit} />
      {!loading ? 
      notes.map((note => <NoteCard key ={note.id} note ={note}/>)) 
      : <Spinner size='lg' />}
    
    </Stack>
    </Container>
   );
}
 
export default Feed;