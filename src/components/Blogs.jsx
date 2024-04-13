import React from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { useDispatch } from 'react-redux'
import { createNewBlog, initialBlogs, voteIncrease } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

const Blogs = ({ blogRef, sortedBlog }) => {
  const dispatch = useDispatch()
  const createBlog = async(newObject) => {
    try {
      blogRef.current.toggleVisibility()
      if(newObject){
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

  const updateBlog = async(updateObject, id) => {
    try {
      dispatch(voteIncrease(updateObject, id))
      dispatch(initialBlogs())
      dispatch(setNotification('likes increased'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    } catch (error) {
      dispatch(setNotification('error : update not successfull'))
    }
  }

  return (
    <div>
      <div>
        <Togglable buttonLabel = 'Create new Blog' ref={blogRef}>
          <CreateBlog createBlog={createBlog}/>
        </Togglable>
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

{/* <Blog key={blog.id} blog={blog} likesHandler= {updateBlog} deleteHandler={removeBlog}/> */}
