import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  //console.log("reducer");
  //console.log("not reducer", action.type, action.payload);
  switch (action.type) {
    case "SET":
      return action.payload;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useAddNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  return (newNotification) => {
    dispatch({ type: "SET", payload: newNotification });
    setTimeout(() => dispatch({ type: "REMOVE" }), 2000);
  };
};

export default NotificationContext;
