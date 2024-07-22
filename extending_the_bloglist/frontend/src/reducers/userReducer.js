import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import blogService from "../services/blogs";
import { addNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});
export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
export const loginUser = (requestedUser) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(requestedUser);
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser),
      );
      blogService.setToken(loggedUser.token);
      dispatch(setUser(loggedUser));
      const notification = {
        message: "user successfully logged in",
        type: "success",
      };
      dispatch(addNotification(notification));
    } catch (error) {
      console.log(error);
      const notification = {
        message: "wrong username or password",
        type: "error",
      };
      dispatch(addNotification(notification));
    }
  };
};
export const recoverUser = (user) => {
  return (dispatch) => {
    blogService.setToken(user.token);
    dispatch(setUser(user));
  };
};
export const logOut = (user) => {
  return async (dispatch) => {
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(removeUser());
  };
};
