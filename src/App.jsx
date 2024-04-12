import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable/index.jsx'
import CreateBlog from './components/CreateBlog/index.jsx'
import Login from './components/login/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer.js'
import { initialBlogs, createNewBlog, voteIncrease } from './reducers/blogReducer.js'
import { loadFromLocalStorage } from './reducers/loginReducer.js'



const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogList = useSelector((state ) => state.blogs)
  const copiedBlogList = [...blogList]

  const handleLogin = async (data) => {
    try {
      const userToLogin = await loginService.login(data)
      window.localStorage.setItem('loggedInUser', JSON.stringify(userToLogin))
      blogService.setToken(userToLogin.token)
      // dispatch(login(data))
      dispatch(setNotification('User successfully logged in'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
      setUser(userToLogin)
    } catch (error) {
      console.log(error)
      dispatch(setNotification('error Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }

  useEffect(() => {
    // const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    // if(loggedUserJSON){
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   blogService.setToken(user.token)
    // }
    dispatch(initialBlogs())
  }, [])
  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  const blogRef = useRef()

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
  const createBlog = async(newObject) => {
    try {
      blogRef.current.toggleVisibility()
      if(newObject){
        dispatch(createNewBlog(newObject))
        dispatch(initialBlogs())
        dispatch(setNotification(`a new blog ${newObject.title} by ${newObject.author}`))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      dispatch(setNotification('error Bad Request'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }

  const updateBlog = async(updateObject, id) => {
    try {
      dispatch(voteIncrease(updateObject, id))
      dispatch(initialBlogs())
      dispatch(setNotification('likes increased'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    } catch (error) {
      dispatch(setNotification('error : update not successfull'))
    }
  }

  const removeBlog = async(id) => {
    await blogService.deleteBlog(id)
    dispatch(initialBlogs())
  }

  const filteredblog = copiedBlogList.filter((blog) => blog?.user?.username === user?.username)
  const sortedBlog = filteredblog.sort((a, b) => a.likes - b.likes)
  if(user === null){
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
          <span> <strong>{user.name}</strong> is logged In</span>
          <button onClick={handleLogOut} style={{ cursor:'pointer' }}>LogOut</button>
        </div>
      </div>
      <div>
        <Togglable buttonLabel = 'Create new Blog' ref={blogRef}>
          <CreateBlog createBlog={createBlog}/>
        </Togglable>
        {sortedBlog.map((blog) => (
          <Blog key={blog.id} blog={blog} likesHandler= {updateBlog} deleteHandler={removeBlog} />
        ))
        }
      </div>
    </div>
  )
}

export default App
