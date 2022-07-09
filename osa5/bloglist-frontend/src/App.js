import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const notifyWith = (message, type) => {
    setNotificationMessage({ message, type })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )

  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      if (returnedBlog.error) {
        notifyWith(returnedBlog.error, 'error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      } else {
        setBlogs(returnedBlog)
        notifyWith(`a new blog '${newTitle}' by ${newAuthor} added`, 'success')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      }
    })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addNewBlog}>
      <h2>Add new blog</h2>
      <label>Title</label>
      <input
        value={newTitle}
        onChange={handleTitleChange}
      />
      <label>Author</label>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <label>Url</label>
      <input
        value={newUrl}
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <Notification notification={notificationMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
        <div>
          <p>{user.username} logged-in</p>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App
