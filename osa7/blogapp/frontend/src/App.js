import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Loggedin from "./components/Loggedin";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Loggedin />
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList />
    </div>
  );
};

export default App;