import { Container, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Feed from "./Pages/Feed";
import Login from "./Pages/Login";
import NoteFetch from "./Utils/NoteFetch";
import noteService from './Utils/NoteFetch'

function App() {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([]) 
  const [newNote, setNewNote] = useState('')
  const [userloading, setuserLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setuserLoading(false)
    }
    setuserLoading(false)
  }, [])
  
  useEffect(() => {
    console.log('note')

    if(user !== null){
        console.log(user)
        noteService
        .getAll(user.token).then(initialNotes => {
          setNotes(initialNotes.reverse())
          setLoading(false)
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
    let notesCopy = [...notes]
    notesCopy.unshift(returnedNote)
    setNotes(notesCopy)
    setNewNote('')
  }

  if(userloading){
    return (
      <Container padding='20%'>
        <Spinner size='lg' />
      </Container>
      
    )
  }
  
  return (
    <div className="App">
      <Container maxW='90%'  centerContent>
        {user ?
         <Feed 
         user = {user} setUser ={setUser} 
         notes ={notes} newNote ={newNote} 
         setNewNote ={setNewNote} handleSubmit ={handleSubmit}
         loading={loading}/> 
         :
          <Login setUser={setUser}/>}
      </Container>
    </div>
  );
}

export default App;
