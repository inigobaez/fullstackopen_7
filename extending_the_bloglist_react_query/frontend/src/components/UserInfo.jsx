import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../contexts/userContext";
import BlogService from "../services/blogs";

const UserInfo = ({ name }) => {
  const [user, dispatch] = useContext(UserContext);
  const userStyle = { fontStyle: "italic" };
  const handleLogout = () => {
    dispatch({ type: "REMOVE" });
    BlogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };
  return (
    <>
      <span style={userStyle}>{`${name} logged in`}</span>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      <br />
      <br />
    </>
  );
};
UserInfo.propTypes = {
  name: PropTypes.string.isRequired,
};
export default UserInfo;
