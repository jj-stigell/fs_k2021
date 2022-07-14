import { useState } from 'react'

const Blog = ({ blog, addLike, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addNewLike = (event) => {
    event.preventDefault()
    addLike({
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog._id
    })
  }

  const deleteExistingBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog._id)
  }

  const [detailsVisible, setVisibility] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div style={blogStyle} key={blog._id} className='blog'>
      <b>Title:</b> {blog.title}
      <b>Author:</b> {blog.author}
      <div style={showWhenVisible} className='hiddenFirst'>
        <b>Url:</b> {blog.url}
        <b>Id:</b> {blog._id}
        <span className="likes">
          <b>Likes:</b> {blog.likes}
        </span>
        <button onClick={() => setVisibility(false)}>hide</button>
        <button onClick={addNewLike}>like</button>
        <form onSubmit={(event) => {
          if(window.confirm(`Delete ${blog.title}`)) {
            deleteExistingBlog(event)
          }
        }}>
          <button type="submit">Delete</button>
        </form>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisibility(true)}>view</button>
      </div>
    </div>
  )
}

export default Blog