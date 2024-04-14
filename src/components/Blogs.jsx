import React from 'react'
import { Link } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createNewBlog, initialBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'

const Blogs = ({ sortedBlog, blogRef }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.loggedInUser)
  const createBlog = async (newObject) => {
    try {
      blogRef.current.toggleVisibility()
      if (newObject) {
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

  return (
    <div>
      <h1>Blog App</h1>
      <Togglable buttonLabel='Create new Blog' ref={blogRef}>
        <CreateBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {sortedBlog.map((blog, index) => (
          <div key={index}>
            <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
            <br />
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Blogs

