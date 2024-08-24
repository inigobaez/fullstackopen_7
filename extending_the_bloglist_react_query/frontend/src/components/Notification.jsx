import { useContext } from "react";
import Alert from "react-bootstrap/Alert";
import NotificationContext from "../contexts/notificationContext";

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  if (notification === null) {
    return;
  }
  return (
    <div>
      <Alert variant={notification.type}>{notification.message}</Alert>
    </div>
  );
};

export default Notification;
