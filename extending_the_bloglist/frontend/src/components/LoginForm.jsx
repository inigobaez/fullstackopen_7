import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };
  return (
    <>
      <form data-testid="loginForm" onSubmit={handleLogin}>
        <span>loginform</span>
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
