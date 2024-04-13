import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

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

export const login = (data) => {
  return async(dispatch) => {
    try {
      const userToLogin = await loginService.login({ ...data })
      if(userToLogin){
        window.localStorage.setItem(userStorageKey, JSON.stringify(userToLogin))
        dispatch(setUserToken(userToLogin))
      }
    } catch (error){
      console.log('error')
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