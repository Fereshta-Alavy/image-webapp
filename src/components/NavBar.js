import React from "react";
import { Menu as Nav, Icon, Button } from "element-react";
import { NavLink } from "react-router-dom";

function NavBar({ handleSignOut }) {
  return (
    <Nav mode="horizontal" theme="dark" defaultActive="1">
      <div className="nav-container">
        <div className="nav-items">
          <Nav.Item index="1">
            <NavLink to="/addImage" className="nav-link">
              <Icon name="upload"></Icon>
              Upload Image
            </NavLink>
          </Nav.Item>
          <Nav.Item index="2">
            <Button type="warning" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Nav.Item>
        </div>
      </div>
    </Nav>
  );
}

export default NavBar;
