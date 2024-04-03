import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteHandler, likesHandler }) => {
  console.log(typeof likesHandler)
  const [visible, setVisible] = useState(false)
  const  toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteBlog = async() => {

    if( window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`)){
      await deleteHandler(blog.id)
    }
  }
  const likeBlogPost = async() => {
    const updateBlog = { ...blog, likes: ( blog.likes + 1 ) }
    await likesHandler(updateBlog, blog.id)
  }

  return <div className='blog'>
    <span>{blog.title} <span>{blog.author}</span>
      <button onClick={toggleVisibility}>{ visible ? 'Hide' : 'View'}</button></span>
    {visible && <div>
      <br />
      <a href="#">{blog.url}</a>
      <br />
      <p> <span className='likes'>likes:{blog.likes}</span> <button onClick={likeBlogPost}>like</button></p>
      <br />
      <button className='delete-blog' onClick={deleteBlog}>remove</button>
    </div> }
  </div>
}

export default Blog