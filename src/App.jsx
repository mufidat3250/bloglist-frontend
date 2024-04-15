import { useEffect, useRef, useState } from 'react'
import Notification from './components/Notification'
import Login from './components/login/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer.js'
import { logOut } from './reducers/loginUserReducer.js'
import Blogs from './components/Blogs.jsx'
import Users, { User } from './components/Users.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useMatch, Navigate } from 'react-router-dom'
import userService from './services/users.js'
import Blog from './components/Blog.jsx'
import { Link } from 'react-router-dom'
import { loadFromLocalStorage } from './reducers/loginUserReducer.js'
import { Container, AppBar, Toolbar, IconButton, Button } from '@mui/material'
import Styled from 'styled-components'

const BlogTitle = Styled.h1`
  font-family:roboto;
`
const LogOut = Styled.span`
padding:0.3rem;
margin-left:20px;
border:1px solid gray;
background-color:white;
color:black;
font-weight:bold;
border-radius:4px;
`


const App = () => {
  const dispatch = useDispatch()
  const blogList = useSelector((state) => state.blogs.blogs[0])
  const userToLogin = useSelector((state) => state.loggedInUser)
  const [users, setUsers] = useState([])
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')
  const navigate = useNavigate()
  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res))
  }, [])
  const user = userMatch ? users?.find((user) => user.id === userMatch.params.id) : null
  const blog = blogMatch ? blogList?.find((blog) => blog.id === blogMatch.params.id) : null

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])
  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  const blogRef = useRef()

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }


  const filteredblog = blogList?.filter((blog) => blog?.user?.username === userToLogin?.username)
  const sortedBlog = filteredblog?.sort((a, b) => a.likes - b.likes)
  if (userToLogin === null) {
    return <Container>
      <Login />
    </Container>
  }
  return (
    <Container>
      <Notification />
      <div>
        <BlogTitle>Blog</BlogTitle>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
            </IconButton>
            <Button color='inherit' component={Link} to='/blogs'>
               Blogs
            </Button>
            <Button component={Link} to={'/users'} color='inherit'>
             Users
            </Button>
            <Button color='inherit'>
              <span> <strong>{userToLogin.name}</strong> is logged In</span>
              <LogOut color='secondary' onClick={handleLogOut} style={{ cursor: 'pointer' }}>LogOut</LogOut>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        <Route path='/' element={<Blogs blogRef={blogRef} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog}/>} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path="*" element={<Navigate replace to="/" />} />

      </Routes>
    </Container>
  )
}

export default App
