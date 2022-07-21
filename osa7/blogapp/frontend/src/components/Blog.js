import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { addNewLike, delBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);
  const user = useSelector(state => state.user)
  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";
  const own = blog.user && user.username === blog.user.username;

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
    navigate('/')
  };

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <a target="_blank" rel="noreferrer" href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      added by {addedBy}
      {own && <button onClick={() => removeBlog(blog)}>remove</button>}
    </div>
  );
};

export default Blog;