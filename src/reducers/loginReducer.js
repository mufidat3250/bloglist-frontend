import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const initialState = null

const userStoragekey = 'loggedInUser'
const loginSlice = createSlice({
  name:'loggedInUser',
  initialState,
  reducers:{
    setUserToken (state, action) {
      return action.payload
    },
    loadFromLocalStorage (state, action){
      const loggedUserJSON = window.localStorage.getItem('loggedInUser')
      if(loggedUserJSON){
        const user = JSON.parse(loggedUserJSON)
        return user
      }
    }
  }
})

export const login = (data) => {
  return async(dispatch) => {
    try {
      const userToLogin = await loginService.login({ ...data })
      if(userToLogin){
        window.localStorage.setItem(userStoragekey, JSON.stringify(userToLogin))
        dispatch(setUserToken(userToLogin.token))
      }
    } catch (error){
      console.log('error')
    }
  }
}

export const { setUserToken, loadFromLocalStorage } = loginSlice.actions

export default loginSlice.reducer