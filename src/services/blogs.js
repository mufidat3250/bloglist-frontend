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

const getUsersComment = async(id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}
const  createComment = async(id, newComment) => {
  console.log(token)
  const config = {
    headers:{ Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik9tb2xhYmFrJ3MiLCJpZCI6IjY2MDZlYjY4ODBhOTZlNmY0MjUwNGRmNiIsImlhdCI6MTcxMTcyOTU0Nn0.f26umyy7SWtMki-jSUFB9kTTkw-zwZirQ79NQxOT9rI' }
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, newComment, config)
  return response.data
}

export default { getAllBlogs, setToken, create, deleteBlog, update, getUsersComment, createComment }
