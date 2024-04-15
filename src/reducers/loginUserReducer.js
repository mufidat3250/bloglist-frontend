import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const userStorageKey = 'loggedInUser'
const loginSlice = createSlice({
  name:'loggedInUser',
  initialState,
  reducers:{
    setUserToken (state, action) {
      return action.payload
    },
    loadFromLocalStorage (state, action){
      const loggedUserJSON = window.localStorage.getItem(userStorageKey)
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
        return user
      }
    },
    clearUserToken (state, action) {
      window.localStorage.removeItem(userStorageKey)
      return null
    }
  }
})

export const login = (username, password) => {
  return async(dispatch) => {
    try {
      const userToLogin = await loginService.login({ username, password })
      if(userToLogin){
        window.localStorage.setItem(userStorageKey, JSON.stringify(userToLogin))
        blogService.setToken(userToLogin.token)
        console.log({ userToLogin })
        dispatch(setUserToken(userToLogin))
        dispatch(setNotification('User successfully logged in'))
        setTimeout(() => {
          dispatch(setNotification(''))
        }, 2000)
      }
    } catch (error){
      console.log(error,'error')
      dispatch(setNotification('error Wrong username or password'))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 2000)
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(userStorageKey)
    dispatch(clearUserToken())
  }
}

export const { setUserToken, loadFromLocalStorage, clearUserToken } = loginSlice.actions

export default loginSlice.reducer