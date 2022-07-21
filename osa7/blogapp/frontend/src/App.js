import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(byLikes)));
  }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user);
        userService.setUser(user);
        dispatch(setNotification(`${user.name} logged in!`, 5))
      })
      .catch(() => {
        dispatch(setNotification("wrong username/password", 5))
      });
  };

  const logout = () => {
    setUser(null);
    userService.clearUser();
    dispatch(setNotification("good bye", 5))
  };

  const createBlog = async (blog) => {
    blogService
      .create(blog)
      .then((createdBlog) => {
        dispatch(setNotification(`a new blog '${createdBlog.title}' by ${createdBlog.author} added`, 5))
        setBlogs(blogs.concat(createdBlog));
        blogFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        dispatch(setNotification("creating a blog failed: " + error.response.data.error, 5))
      });
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    blogService.remove(id).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes);
      setBlogs(updatedBlogs);
    });
  };

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };

    blogService.update(liked.id, liked).then((updatedBlog) => {
      dispatch(setNotification(`you liked '${updatedBlog.title}' by ${updatedBlog.author}`, 5));
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? updatedBlog : b))
        .sort(byLikes);
      setBlogs(updatedBlogs);
    });
  };

  if (user === null) {
    dispatch(setNotification('Not logged in', 5))
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

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
    </div>
  );
};

export default App;
