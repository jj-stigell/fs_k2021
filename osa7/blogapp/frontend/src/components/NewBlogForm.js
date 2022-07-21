import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdBlog = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try {
      dispatch(addNewBlog(createdBlog))
      dispatch(setNotification(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`, 5))
      blogFormRef.current.toggleVisibility();
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      dispatch(setNotification("creating a blog failed: " + error.response.data.error, 5))
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <button id="create-butto" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
