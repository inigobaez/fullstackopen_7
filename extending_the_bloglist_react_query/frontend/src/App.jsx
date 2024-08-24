import { useEffect, useRef, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import blogService from "./services/blogs";

import UserContext from "./contexts/userContext";

import NavMenu from "./components/NavMenu";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogsView from "./components/BlogsView";
import BlogView from "./components/BlogView";
import UsersView from "./components/UsersView";
import UserView from "./components/UserView";

const App = () => {
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
      <Router>
        {user !== null && <NavMenu user={user} />}

        <div className="container">
          <h2>{appHeader}</h2>
          <Notification />
          <Routes>
            <Route
              path="/blogs/:id"
              element={user ? <BlogView /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/"
              element={
                user ? (
                  <BlogsView user={user} />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route
              path="/users/:id"
              element={user ? <UserView /> : <Navigate replace to="/login" />}
            />
            <Route
              path="/users"
              element={user ? <UsersView /> : <Navigate replace to="/login" />}
            />

            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
