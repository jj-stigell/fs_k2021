import { useState } from "react"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setVisibility] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' } 

  return (
    <div style={blogStyle} key={blog._id}>
      <b>Title:</b> {blog.title} 
      <div style={showWhenVisible}>
        <b>Author:</b> {blog.author}
        <b>Url:</b> {blog.url}
        <b>Id:</b> {blog._id}
        <b>Likes:</b> {blog.likes}
        <button onClick={() => setVisibility(false)}>hide</button>
        <button>like</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisibility(true)}>view</button>
      </div>
    </div>
  )
}

export default Blog