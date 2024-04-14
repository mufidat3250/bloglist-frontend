import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from '../reducers/blogReducer'
import { voteIncrease } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import { logOut } from '../reducers/loginUserReducer'

const Title = Styled.h1`

`
const Heading = Styled.h3``
const Link = Styled.a`
`

const LikeWrapper = Styled.div`
display:flex;
gap: 0.5rem;
align-items: center;
`
const Button = Styled.button`
padding:0.4rem 1rem;
background-color:blue;
color:white;
outline:none;
border:none;
`

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteBlog = async() => {
    if(window.confirm(`Remove blog you are not gonna need it! by ${blog.author}`))
      await blogService.deleteBlog(blog.id)
    dispatch(initialBlogs())
    navigate('/blogs')
  }
  const updateBlog = async() => {
    try {
      const updateBlog = { ...blog, likes: ( blog.likes + 1 ) }
      dispatch(voteIncrease(updateBlog, blog.id))
      dispatch(initialBlogs())
      dispatch(setNotification('likes increased'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    } catch (error) {
      dispatch(setNotification('error : update not successfull'))
    }
  }
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/')
  }

  if(!blog) return
  return <div className='blog'>
    <Title>blog</Title>
    <Heading>{blog.title} {blog.author}
    </Heading>
    <Link href="#">{blog.url}</Link>
    <LikeWrapper> <p className='likes'>likes:{blog.likes}</p> <Button onClick={updateBlog}>like</Button></LikeWrapper>
    <Button className='delete-blog' onClick={deleteBlog}>remove</Button>
  </div>
}

export default Blog