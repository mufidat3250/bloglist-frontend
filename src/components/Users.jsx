import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import users from '../services/users'
import { Link, useMatch } from 'react-router-dom'
import { Table, TableContainer, TableBody, TableHead, Paper, TableRow, TableCell } from '@mui/material'


const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res))
  },[])


  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <tr>
              <td></td>
              <th>blogs Created</th>
            </tr>
          </TableHead>
          {users.map((user, index) => {
            return <TableBody key={index}>
              <TableRow>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            </TableBody>
          })}
        </Table>
      </TableContainer>
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
