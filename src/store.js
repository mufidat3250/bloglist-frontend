import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginUserReducer from './reducers/loginUserReducer'

const store = configureStore({
  reducer:{
    notification: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loginUserReducer
  }
})
export default store