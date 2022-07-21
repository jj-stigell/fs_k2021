import { useSelector, useDispatch } from 'react-redux'
import { addNewLike, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from "./Blog";

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  
  const likeBlog = (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    dispatch(addNewLike(blog.id, updatedBlog))
    dispatch(setNotification(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`, 5));
  };

  const removeBlog = (blog) => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`);
    if (!ok) {
      return
    }
    dispatch(delBlog(blog.id))
    dispatch(setNotification(`removed '${blog.title}' by ${blog.author}`))
  };

  return (
    <div id="blogs">
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList