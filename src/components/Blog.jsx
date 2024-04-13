import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogReducer'

const Blog = ({ blog, deleteHandler, likesHandler }) => {
  const dispatch = useDispatch()
  // const deleteBlog = async() => {
  //   if( window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`)){
  //     await deleteHandler(blog.id)
  //   }
  // }

  const deleteBlog = async() => {
    if(window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`)){
      await blogService.deleteBlog(blog.id)
      dispatch(initialBlogs())
    }
  }

  const likeBlogPost = async() => {
    const updateBlog = { ...blog, likes: ( blog.likes + 1 ) }
    await likesHandler(updateBlog, blog.id)
  }
  if(!blog) return

  console.log({ blog })

  return <div className='blog'>
    <h2>{blog.title} {blog.author}
    </h2>
    <a href="#">{blog.url}</a>
    <br />
    <p> <span className='likes'>likes:{blog.likes}</span> <button onClick={likeBlogPost}>like</button></p>
    <br />
    <button className='delete-blog' onClick={deleteBlog}>remove</button>
  </div>
}

export default Blog