import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable/index.jsx'
import CreateBlog from './components/CreateBlog/index.jsx'
import Login from './components/login/index.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const handleLogin = async (data) => {
    try {
      const userToLogin = await loginService.login(data)
      window.localStorage.setItem('loggedInUser', JSON.stringify(userToLogin))
      blogService.setToken(userToLogin.token)
      setMessage('User successfully loged in')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      setUser(userToLogin)
    } catch (error) {
      console.log(error)
      setMessage('error Wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    getAllBlogs()
  }, [])

  const blogRef = useRef()

  const getAllBlogs = async() => {
    const response = await blogService.getAllBlogs()
    setBlogs(response)
  }
  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
  const createBlog = async(newObject) => {
    try {
      blogRef.current.toggleVisibility()
      const response = await blogService.create(newObject)
      console.log({ response })
      if(response){
        setBlogs((prev) => prev.concat(response))
        getAllBlogs()
        setMessage(`a new blog ${response.title} by ${response.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      setMessage('error Bad Request')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }
  }

  const updateBlog = async(blogObject, id) => {
    try {
      const response = await blogService.update(blogObject, id)
      getAllBlogs()
      if(response) {
        setMessage('likes increased')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      setMessage('error : update not successfull')
    }
  }

  const removeBlog = async(id) => {
    await blogService.deleteBlog(id)
    getAllBlogs()
  }

  const filteredblog = blogs.filter((blog) => blog?.user?.username === user?.username)
  const sortedBlog = filteredblog.sort((a, b) => a.likes - b.likes)
  if(user === null){
    return <div>
      <h1>Log In to Application</h1>
      {message &&  <Notification message={message}/>}
      <Login loginData={handleLogin}/>
    </div>
  }
  return (
    <div>
      {message &&  <Notification message={message}/>}
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
          <Blog key={blog.id} blog={blog} likeshandler= {updateBlog} deleteHandler={removeBlog} />
        ))
        }
      </div>
    </div>
  )
}

export default App
