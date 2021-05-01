import React, { useContext } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { CurrentUserContext } from './JoblyContext';

// display navbar for top of page
function NavBar({ logout }) {
    const {currentUser} = useContext(CurrentUserContext);
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Jobly
        </NavLink>

        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
          {currentUser ? <NavLink to="/" onClick={logout}>Logout {currentUser.username}</NavLink> : <NavLink to="/login">Login</NavLink> }
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
