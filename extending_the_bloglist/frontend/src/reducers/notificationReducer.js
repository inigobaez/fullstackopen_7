import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      console.log("inside reducer", action.payload);
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});
export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
export const addNotification = (notification) => {
  console.log("add", notification);
  return async (dispatch) => {
    dispatch(setNotification(notification));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};
