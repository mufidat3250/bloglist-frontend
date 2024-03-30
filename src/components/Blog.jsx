import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return <div style={blogStyle}>
    <span>{blog.title} <button onClick={()=> setVisible(!visible)}>{ visible ? 'View' : 'Hide'}</button></span>
    {visible && <div>
      <span>{blog.author}</span>
      <p>{blog.url}</p>
      <span>likes: {blog.likes}</span>
      <span>{blog.username}</span>
    </div> }
  </div>  
}

export default Blog