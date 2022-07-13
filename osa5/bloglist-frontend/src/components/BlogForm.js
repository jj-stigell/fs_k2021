import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ addNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const sendBlogForm = (event) => {
    event.preventDefault()
    addNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={sendBlogForm}>
      <h2>Add new blog</h2>
      <label>Title</label>
      <input
        value={newTitle}
        onChange={handleTitleChange}
        placeholder='Title name'
      />
      <label>Author</label>
      <input
        value={newAuthor}
        onChange={handleAuthorChange}
        placeholder='Author name'
      />
      <label>Url</label>
      <input
        value={newUrl}
        onChange={handleUrlChange}
        placeholder='Url to blog'
      />
      <button type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = { addNewBlog: PropTypes.func.isRequired }

export default BlogForm