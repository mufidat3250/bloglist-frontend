import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
  name:'blog',
  initialState:[],
  reducers:{
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    },
    updateVote (state, action) {
      const id = action.payload.id
      const obj = action.payload.updateblog
      return state.map((blog ) => blog.id === id ? obj: blog)
    }
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