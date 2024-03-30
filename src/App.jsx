import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import userService from './services/users.js'
import Togglable from "./components/Togglable/index.jsx";
import CreateBlog from "./components/CreateBlog/index.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setAllUsers] = useState([])
  const [user, setUser] = useState(null);

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
  const createBlog = async(newObject) => {
    try {
      blogRef.current.toggleVisibility()
      const response = await blogService.create(newObject)
      setBlogs((prev)=> prev.concat(response))
      if(response){
        setMessage(`a new blog ${response.title} by ${response.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      }
    } catch (error) {
      console.log(error)
      setMessage(`error All imput field is required`)
    }
  }

const filteredblog = blogs.filter((blog)=> blog?.user?.username === user?.username)
const sortedBlog = filteredblog.sort((a, b)=> a.likes - b.likes)
console.log(sortedBlog)

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
          <CreateBlog createBlog={createBlog}/>
         </Togglable>
        {sortedBlog.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))
          }
        </div>
       
    </div>
  );
};

export default App;
