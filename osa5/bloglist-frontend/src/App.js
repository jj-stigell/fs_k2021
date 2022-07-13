import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogFrom from './components/BlogForm'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
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
  const blogFormRef = useRef()

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

  const addLike = async (blogObject) => {
    try {
      const res = await blogService.update(blogObject)
      blogs.forEach(element => {
        if (element._id === blogObject.id) {
          element.likes = res.likes
        }
      })
      blogs.sort(function (a, b) {
        return a.likes - b.likes
      })
      notifyWith(`Like added to blog title '${res.title}'`, 'success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
    } catch (exception) {
      console.log(exception)
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
        <Blog key={blog._id} blog={blog} addLike={addLike} user={user} deleteBlog={deleteBlog}/>
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
          blogFormRef.current.toggleVisibility()
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

  return (
    <div>
      <Notification notification={notificationMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :
        <div>
          <p>{user.username} logged-in</p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel='add blog' ref={blogFormRef}>
            <BlogFrom
              addNewBlog={addNewBlog}
              newTitle={newTitle}
              newAuthor={newAuthor}
              newUrl={newUrl}
              handleTitleChange={({ target }) => setNewTitle(target.value)}
              handleAuthorChange={({ target }) => setNewAuthor(target.value)}
              handleUrlChange={({ target }) => setNewUrl(target.value)}
            />
          </Togglable>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App
