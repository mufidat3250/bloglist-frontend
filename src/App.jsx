import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      console.log({blogs})
    )  
  }, [])
  const handleSubmit = () => {

  }

  return (
    <div>
      <h2>blogs</h2>
      <Login/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App