import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  if(newToken){
    token = `Bearer ${newToken}`
  }
}
const getAllBlogs = async() => {
  const response = await axios.get(baseUrl)
  return  response.data
}


console.log({ token })
const create = async(newObject) => {
  const config = {
    headers:{ Authorization : token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const deleteBlog = async(id) => {
  const config = {
    headers:{ Authorization : token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
const update = async(updateObject, id) => {
  const config = {
    headers:{ Authorization : token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, updateObject, config)
  return response.data
}

export default { getAllBlogs, setToken, create, deleteBlog, update }