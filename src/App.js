import { Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import NoteFetch from "./Utils/NoteFetch";
import noteService from './Utils/NoteFetch'

function App() {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  useEffect(() => {
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log()
    }
  }, [])
  
  useEffect(() => {
    console.log('note')

    if(user !== null){
        console.log(user)
        noteService
        .getAll(user.token).then(initialNotes => {
          setNotes(initialNotes)
        })
    }
   
  }, [user])
 

  const handleSubmit = async() => {
    const newNoteObj = {
      content: newNote,
      important: false
    }
    const returnedNote = await noteService.create(newNoteObj)
    console.log(returnedNote)
    setNotes(notes.concat(returnedNote))
    setNewNote('')
  }
  return (
    <div className="App">
      <Container maxW='90%'  centerContent>
        {user ?
         <Feed 
         user = {user} setUser ={setUser} 
         notes ={notes} newNote ={newNote} 
         setNewNote ={setNewNote} handleSubmit ={handleSubmit}/> 
         :
          <Login setUser={setUser}/>}
      </Container>
    </div>
  );
}

export default App;
