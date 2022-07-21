import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Loggedin from "./components/Loggedin";
import User from "./components/User";
import Users from "./components/Users";
import ViewBlog from "./components/ViewBlog";

const App = () => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(state => state.user);

  const padding = {
    padding: 5
  }
  
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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
    <Router>
       <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <Loggedin />
        <Notification />
      </div>
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<ViewBlog />} />
        <Route path="/" element={
          <div>
            <h2>blogs app</h2>
            <Togglable buttonLabel="new note" ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <BlogList />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;