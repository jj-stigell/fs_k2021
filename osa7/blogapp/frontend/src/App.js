import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";

import loginService from "./services/login";
import userService from "./services/user";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

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
        <NewBlogForm blogFormRef={blogFormRef}/>
      </Togglable>
      <BlogList user={user}/>
    </div>
  );
};

export default App;