import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logOut } from "../reducers/userReducer";

const UserInfo = ({ name }) => {
  //console.log(name)
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <>
      <span>{`${name} logged in`}</span>
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
