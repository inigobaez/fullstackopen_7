import { Link } from "react-router-dom";

import UserInfo from "./UserInfo";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Stack from "react-bootstrap/Stack";

const NavMenu = ({ user }) => {
  return (
    <Navbar>
      <Navbar.Brand href="#home">Fullstackopen</Navbar.Brand>
      <Stack direction="horizontal" gap={3}>
        <Nav.Link href="#" as="span">
          <Link to="/">blogs</Link>
        </Nav.Link>
        <Nav.Link href="#" as="span">
          <Link to="/users">users</Link>
        </Nav.Link>
        <UserInfo name={user.name} />
      </Stack>
    </Navbar>
  );
};
export default NavMenu;
