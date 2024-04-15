import { createSlice, current } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const initialState = {
  blogs:[],
  Comments:[]
}

const blogSlice = createSlice({
  name:'blogs',
  initialState,
  reducers:{
    setBlogs(state, action) {
      state.blogs.push(action.payload)
    },
    appendBlog (state, action) {
      state.blogs.push(action.payload)
    },
    updateVote (state, action) {
      const id = action.payload.id
      const obj = action.payload.updateblog
      return state.blogs.map((blog ) => blog.id === id ? obj: blog)
    },
  }
})

export const {  setBlogs, appendBlog , updateVote } = blogSlice.actions

export const initialBlogs = () => {
  return async(dispatch) => {
    const blogs = await BlogService.getAllBlogs()
    dispatch(setBlogs(blogs))
  }
}
export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await BlogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(initialBlogs())
  }
}

export const voteIncrease = (updateObject, id) => {
  return async (dispatch) => {
    const updateblog = await BlogService.update(updateObject, id)
    dispatch(updateVote({ id:id, updateblog }))
    dispatch(initialBlogs())
  }
}

export default blogSlice.reducer