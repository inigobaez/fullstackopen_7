import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../contexts/userContext";
import { useAddNotification } from "../contexts/notificationContext";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const [user, dispatch] = useContext(UserContext);
  console.log("loginform to / when user", user);

  const addNotification = useAddNotification();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      return;
    }
    let notification;
    try {
      const loggedUser = await loginService.login({ username, password });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      blogService.setToken(loggedUser.token);
      dispatch({ type: "SET", payload: loggedUser });
      notification = {
        message: "user successfully logged in",
        type: "success",
      };
      navigate("/");
    } catch (error) {
      console.log(error);
      notification = {
        message: "wrong username or password",
        type: "danger",
      };
    }
    addNotification(notification);
  };
  return (
    <>
      <form data-testid="loginForm" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            data-testid="username"
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            data-testid="password"
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;
