import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state = content
      return state
    }
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer