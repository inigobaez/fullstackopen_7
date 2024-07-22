import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { initializeBlogs } from "./reducers/blogReducer";
import { recoverUser } from "./reducers/userReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("user", user);
  const appHeader = user === null ? "Log in to application" : "Blogs";

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
    }
  }, [user]);
  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser);
      dispatch(recoverUser(user));
    }
  }, []);

  return (
    <>
      <h2>{appHeader}</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <UserInfo name={user.name} />
          <Toggable buttonLabel="new Blog" ref={blogFormRef}>
            <CreateBlogForm />
          </Toggable>
          <BlogList user={user} />
        </>
      )}
    </>
  );
};

export default App;
