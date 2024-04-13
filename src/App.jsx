import { useEffect, useRef, useState } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Login from './components/login/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initialBlogs } from './reducers/blogReducer.js'
import { loadFromLocalStorage, logOut } from './reducers/loginUserReducer.js'
import { login } from './reducers/loginUserReducer.js'
import Blogs from './components/Blogs.jsx'
import Users, { User } from './components/Users.jsx'
import { Routes, Route } from 'react-router-dom'
import { useMatch } from 'react-router-dom'
import  userService  from './services/users.js'
import Blog from './components/Blog.jsx'
import { Link } from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const blogList = useSelector((state ) => state.blogs)
  const copiedBlogList = [...blogList]
  const userToLogin = useSelector((state ) => state.loggedInUser)
  const [users, setUsers] = useState([])
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    userService.getAllUsers().then((res) => setUsers(res))
  },[])
  console.log({ blogMatch })
  const user = userMatch ? users.find((user ) => user.id === userMatch.params.id ) : null
  const blog = blogMatch ? blogList.find((blog) => blog.id === blogMatch.params.id) : null

  console.log({ blog })
  const handleLogin = async (data) => {
    try {
      dispatch(login(data))
      blogService.setToken(userToLogin?.token)
      dispatch(setNotification('User successfully logged in'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    } catch (error) {
      console.log(error)
      dispatch(setNotification('error Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }
  useEffect(() => {
    dispatch(loadFromLocalStorage())
    dispatch(initialBlogs())

  }, [])
  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  const blogRef = useRef()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const filteredblog = copiedBlogList.filter((blog) => blog?.user?.username === userToLogin?.username)
  const sortedBlog = filteredblog.sort((a, b) => a.likes - b.likes)
  if(userToLogin === null){
    return <div>
      <h1>Log In to Application</h1>
      <Notification/>
      <Login loginData={handleLogin}/>
    </div>
  }
  return (
    <div>
      <Notification/>
      <div>
        <h3>Blog</h3>
        <div>
          <Link to={'/blogs'}>Blogs</Link>
          <Link to={'/users'}>Users</Link>
          <span> <strong>{userToLogin.name}</strong> is logged In</span>
          <button onClick={handleLogOut} style={{ cursor:'pointer' }}>LogOut</button>
        </div>
      </div>
      <Routes>
        <Route path='/blogs' element={<Blogs sortedBlog={sortedBlog} blogRef={blogRef}/>}/>
        <Route path='/blogs/:id' element={<Blog blog={blog}/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/users/:id' element={ <User user={user}/> }/>
      </Routes>
    </div>
  )
}

export default App
