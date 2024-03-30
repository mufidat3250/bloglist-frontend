import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getAllBlogs = async() => {
  const response = await axios.get(baseUrl)
  return  response.data
}
const config = {
  headers:{ Authorization : token }
}

const create = async(newObject) => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async(id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAllBlogs, setToken, create, deleteBlog }