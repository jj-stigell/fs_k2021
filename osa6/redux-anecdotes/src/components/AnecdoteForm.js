import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { addNew } from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const anecdote =  { 
      content: event.target.anecdote.value,
      votes: 0
    }
    event.target.anecdote.value = ''
    const newAnecdote = await addNew(anecdote)
    console.log("new anecdote is:", newAnecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(createNotification('created a new anecdote'))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm