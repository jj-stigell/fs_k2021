import { createSlice } from '@reduxjs/toolkit'
import { getAll, addNew, addVote } from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      const unSorted = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
      return unSorted.sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    }
  },
})

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const anecdote = await addNew(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const addNewVote = (id, content) => {
  return async dispatch => {
    const anecdote = await addVote(id, content)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export default anecdoteSlice.reducer