import { useSelector, useDispatch } from 'react-redux'
import { addNewVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })
  const dispatch = useDispatch()

  const addVote = (anecdote) => {
    const newContent = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    dispatch(addNewVote(anecdote.id, newContent))
    dispatch(createNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(createNotification(null))
    }, 5000)


  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList