import { useEffect, useRef, useContext } from "react";
import blogService from "./services/blogs";

import UserContext from "./contexts/userContext";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggable from "./components/Togglable";
import BlogList from "./components/BlogList";

const App = () => {
  const blogFormRef = useRef();
  const [user, userDispatch] = useContext(UserContext);

  const appHeader = user === null ? "Log in to application" : "Blogs";

  useEffect(() => {
    const loggedBlogappUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedBlogappUser) {
      const user = JSON.parse(loggedBlogappUser);
      blogService.setToken(user.token);
      userDispatch({ type: "SET", payload: user });
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
