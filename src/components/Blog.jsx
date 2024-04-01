import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteHandler, likesHandler }) => {
  const [visible, setVisible] = useState(false)
  const  toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = async() => {

    if( window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`)){
      await deleteHandler(blog.id)
    }
  }
  const likeBlogPost = () => {
    likesHandler({ ...blog, likes: blog.likes + 1 }, blog.id)
  }

  return <div className='blog'>
    <span>{blog.title} <span>{blog.author}</span>
      <button onClick={toggleVisibility}>{ visible ? 'Hide' : 'View'}</button></span>
    {visible && <div>
      <br />
      <a href="#">{blog.url}</a>
      <br />
      <span>likes: {blog.likes} <button onClick={likeBlogPost}>like</button></span>
      <br />
      <button className='delete-blog' onClick={deleteBlog}>remove</button>
    </div> }
  </div>
}

export default Blog