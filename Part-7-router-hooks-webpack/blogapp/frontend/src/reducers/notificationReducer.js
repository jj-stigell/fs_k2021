import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    }
  },
})

export const { createNotification } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, time) => {
  return async dispatch => {

    dispatch(createNotification(message))
    
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(setNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer