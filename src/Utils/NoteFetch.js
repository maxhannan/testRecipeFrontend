import axios from 'axios'
const baseurl = 'http://localhost:3001/api/notes/'

let token = null 

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async(newtoken) => {
  const a = ''
  setToken(newtoken)
  console.log(token)
  const config = {
    headers: {Authorization: token },
  }
  if(token!== null){
    const request =  await axios.get(baseurl, config)
    console.log('request', request)
    return request.data
  }
  return []
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseurl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${ baseurl }/${id}`, newObject, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, token }