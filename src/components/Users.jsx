import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import users from '../services/users'
import { Link, useMatch } from 'react-router-dom'


const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res))
  },[])
  console.log({ users })

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <th>blogs Created</th>
          </tr>
        </thead>
        {users.map((user, index) => {
          return <tbody key={index}>
            <tr>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          </tbody>
        })}
      </table>
    </>
  )
}


export default Users

export const User = ({ user }) => {
  console.log(user)
  if(!user){
    return
  }
  return  <div>
    <h1>{ user.name }</h1>
    <h4>added blogs</h4>
    {user.blogs.map((blog, index) => <li key={index}>
      {blog.title}
    </li>)}
  </div>
}
