import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import userService from './services/users.js'
import Togglable from "./components/Togglable/index.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setAllUsers] = useState([])
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        
        const userToLogin = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInUser', JSON.stringify(userToLogin))
      blogService.setToken(userToLogin.token)
      setMessage('User successfully loged in')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      setUser(userToLogin);
      setUsername("");
      setPassword("");
      
      
    } catch (error) {
      console.log(error);
      setMessage('error Wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 2000)
      
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    getAllBlogs()
    getAllUsers()
  }, [blogs]);

  const blogRef = useRef()

  const getAllBlogs = async() => {
    const response = await blogService.getAllBlogs()
    setBlogs(response)
  }
  const getAllUsers = async() => {
    const response = await userService.getAllUsers()
    setAllUsers(response)
  }
  const handleLogOut = () => {
    console.log('i am clicked')
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }
  const createBlog = async(e) => {
    e.preventDefault()
    blogRef.current.toggleVisibility()
    console.log(blogs)
  const response = await blogService.create({title, author, url})
  setMessage(`a new blog ${response.title} by ${response.author}`)
  setBlogs((prev)=> prev.concat(response))
  if(response){
    setAuthor('')
    setTitle('')
    setUrl('')
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }
  }

const filteredblog = blogs.filter((blog)=> blog?.user?.username === user?.username)


if(user === null){
  return  <form onSubmit={handleLogin}>
  <h1>Log In to Application</h1>
  {message &&  <Notification message={message}/>}
  <label htmlFor="username">
    <span>username </span>
    <input
      type="text"
      id="username"
      name="username"
      value={username}
      onChange={({ target }) => setUsername(target.value)}
    />
  </label>
  <br />
  <label htmlFor="password">
    <span>password </span>
    <input
      type="password"
      id="password"
      password="password"
      onChange={({ target }) => setPassword(target.value)}
      value={password}
    />
  </label>
  <button type="submit" style={{ cursor: "pointer" }}>
    login
  </button>
</form>
}
  return (
    <div>
     {message &&  <Notification message={message}/>}
        <div>
          <h3>Blog</h3>
        <div>
        <span> <strong>{user.name}</strong> is logged In</span>
        <button onClick={handleLogOut} style={{cursor:'pointer'}}>LogOut</button>
        </div>
        </div>
        <div>
         <Togglable buttonLabel = 'Create new Blog' ref={blogRef}>
         <h2>Create New</h2>
          <form action="" onSubmit={createBlog}>
            <label htmlFor="">
              <span>Title </span>
              <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title}/>
            </label>
            <br />
            <label htmlFor="">
              <span>Author: </span>
              <input type="text" onChange={(e)=> setAuthor(e.target.value)} value={author}/>
            </label>
            <br />
            <label htmlFor="">
              <span>url: </span>
              <input type="text" onChange={(e)=> setUrl(e.target.value)} value={url}/>
            </label>
            <br />
            <button type="submit"> create</button>
          </form>
         </Togglable>

        {filteredblog.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))
          }
        </div>
       
    </div>
  );
};

export default App;
