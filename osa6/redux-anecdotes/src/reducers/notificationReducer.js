import { createSlice } from '@reduxjs/toolkit'

const initialState = ['this is the initial value']

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state.push({ content })
    }
  },
})

export const { createNotification } = notificationSlice.actions
export default notificationSlice.reducer