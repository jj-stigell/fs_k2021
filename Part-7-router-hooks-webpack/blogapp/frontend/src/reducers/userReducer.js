import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/user'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return null
    }
  },
})

export const { setUser, resetUser } = userSlice.actions

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      userService.setUser(user)
      dispatch(setUser(user))
      dispatch(setNotification(`${user.username} logged in!`, 5))
    } catch (error) {
      dispatch(resetUser())
      dispatch(setNotification("wrong username/password", 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    userService.clearUser()
    dispatch(resetUser())
    dispatch(setNotification("good bye", 5))
  }
}

export default userSlice.reducer