import React from 'react'
import { Link } from 'react-router-dom'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createNewBlog, initialBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import Styled from 'styled-components'

const BlogsContainer = Styled.div`
display:flex;
flex-direction:column;
gap:0.6rem;
margin-top: 1rem;
`
const BlogWrapper = Styled.div`
border:1px solid black;
padding: 0.5rem;
`

const Blogs = ({ blogRef }) => {
  const dispatch = useDispatch()
  const blogList = useSelector((state) => state.blogs.blogs)[0]

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
      <BlogsContainer>
        {blogList?.map((blog, index) => (
          <BlogWrapper key={index}>
            <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
            <br />
          </BlogWrapper>
        ))
        }
      </BlogsContainer>
    </div>
  )
}

export default Blogs

