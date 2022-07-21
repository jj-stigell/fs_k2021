import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []
const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    likeBlog(state, action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = { 
        ...blogToChange, 
        likes: blogToChange.likes + 1 
      }
      const unSorted = state.map(blog =>
        blog.id !== id ? blog : changedBlog 
      )
      return unSorted.sort((a, b) => b.likes - a.likes)
    },
    setBlogs(state, action) {
      return action.payload.sort(byLikes)
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  },
})

export const { addBlog, likeBlog, setBlogs, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addNewBlog = content => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch(addBlog(blog))
  }
}

export const addNewLike = (id, content) => {
  return async dispatch => {
    const blog = await blogService.update(id, content)
    dispatch(likeBlog(blog.id))
  }
}

export const delBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer