import { useState } from 'react'
import axios from 'axios'
export const useResource = (baseUrl) => {
  const [resorces, setResource] = useState([])
  let token = null
  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }
  const getAll = async() => {
    const response = axios.get(baseUrl)
    return response.data
  }
  const create = async (newObject) => {
    const config ={
      headers:{ Authorization: token }
    }
    const response = axios.post(baseUrl, newObject, config)
    return response.data
  }

  const update = async (id, newObj) => {
    const config = {
      headers: { Authorization: token }
    }
    const response = axios.put(`${baseUrl}/${id}`, newObj, config)
    return response.data
  }
  const services = {
    setToken,
    create,
    getAll,
    update
  }
  return [
    resorces,
    services
  ]
}