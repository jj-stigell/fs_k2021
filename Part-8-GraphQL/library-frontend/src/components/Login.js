import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { loginUser } from '../queries'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const NewBook = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login, result ] = useMutation(loginUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await login({ variables: { username, password } })
    const token = response.data.login.value
    setToken(token)
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default NewBook
