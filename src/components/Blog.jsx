import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteStyle = {
    backgroundColor: 'blue',
    borderRadius:'8px',
    color:'white',
    padding:'0.4rem',
    cursor:'pointer'
  }

  const LikesIcrement = async() => {
    // await blogServic
  }

  const deleteBlog = async() => {

    if( window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`)){
      await blogService.deleteBlog(blog.id)
    }
  }

  return <div style={blogStyle}>
    <span>{blog.title} <button onClick={() => setVisible(!visible)}>{ visible ? 'View' : 'Hide'}</button></span>
    {visible && <div>
      <br />
      <a href="#">{blog.url}</a>
      <br />
      <span>likes: {blog.likes}</span>
      <span>{blog.author}</span>
      <br />
      <button style={deleteStyle} onClick={deleteBlog}>remove</button>
    </div> }
  </div>
}

export default Blog