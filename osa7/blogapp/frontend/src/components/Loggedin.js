import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Loggedin = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  
  return (
    <div>
      {user.name} logged in
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </div>
  )
}

export default Loggedin