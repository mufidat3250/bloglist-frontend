import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { initialBlogs } from '../reducers/blogReducer'
import { voteIncrease } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import Styled from 'styled-components'
import { useField } from '../hooks/useField'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'

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
const AddByUser = Styled.p`

`
const CommentWrapper = Styled.form`
display:flex;
gap:0.5rem;
flex-direction:column;
width:30%;
`
const CommentContainer = Styled.div``
const Comments = Styled.div`
margin-top: 1rem;
`
const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const comment = useField('text')

  useEffect(() => {
    blogService.getUsersComment().then((res) => setComments(res))
  },[])

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
  const handleSubmit = async(e) => {
    e.preventDefault()
    const response = await blogService.createComment(blog.id, comment.value)
    setComments((prev) => [...prev, response])
    setComments(comments)
    comment.onReset()
  }

  if(!blog) return
  return <div className='blog'>
    <Title>blog</Title>
    <Heading>{blog.title} {blog.author}
    </Heading>
    <Link href="#">{blog.url}</Link>
    <LikeWrapper> <p className='likes'>likes:{blog.likes}</p> <Button onClick={updateBlog}>like</Button></LikeWrapper>
    <AddByUser>Added by <strong>{blog.user.name}</strong></AddByUser>

    <CommentContainer>
      <h2>Comment...</h2>
      <CommentWrapper onSubmit={handleSubmit}>
        <input label='Enter Comment ' {...comment}/>
        <button type='submit'>Add Comment</button>
      </CommentWrapper>
      <Comments>
        {comments.map((comment, index) => <li key={`comment${index}`}>{comment.comment}</li>)}
      </Comments>
    </CommentContainer>

  </div>
}

export default Blog