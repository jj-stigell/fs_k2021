import PropTypes from 'prop-types'

const BlogForm = ({
  addNewBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
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
}

BlogForm.propTypes = {
  addNewBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired
}

export default BlogForm