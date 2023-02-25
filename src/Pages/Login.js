import {
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import loginService from '../Utils/Login'
import noteService from '../Utils/NoteFetch'
const Login = ({setUser}) => {
  const [loginInfo, setLoginInfo] = useState({username:'', password:''})
  const [errorMessage, setErrorMessage] = useState(null)
  const handleSubmit = async() => {
    try {
      const user = await loginService.login(loginInfo)
      await setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setLoginInfo({username: '', password: ''})
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
    
  
 
  return(
 <Container maxW='2xl' paddingTop='100' textAlign='center'>
  <Heading>Sign in</Heading>
  <Stack spacing="6" paddingTop='10'>
  <FormControl >
    <FormLabel>username</FormLabel>
    <Input  value={loginInfo.username} onChange={
      (e)=>setLoginInfo({...loginInfo, username: e.target.value})
      }/>
  </FormControl>
  <FormControl>
    <FormLabel>password</FormLabel>
    <Input type ='password' value={loginInfo.password} onChange={
      (e)=>setLoginInfo({...loginInfo, password: e.target.value})
      }></Input>
  </FormControl>
  <Button onClick={handleSubmit}>Submit</Button>
  <Divider />
  <Button variant='link' colorScheme="blue">Sign Up</Button>
  </Stack>
 </Container>
)
}
export default Login