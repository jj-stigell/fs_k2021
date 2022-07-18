import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const filterAnecdotes = (event) => {
    const word = event.target.value.toLowerCase()
    dispatch(filter(word))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filterAnecdotes} />
    </div>
  )
}

export default Filter