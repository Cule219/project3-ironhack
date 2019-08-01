import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { logout } from "../services/api";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  });
};

const CustomNavbar = props => {
  return (
<nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4 justify-content-space-between">
  
  <div className="container">

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarMain">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/"className="nav-link">
          </Link>
        </li>
      </ul>
    </div>
    <div className="">
      <Navbar.Brand to="/">
      {props.user&&<Link className="text-white" to="/">Home</Link>}
      </Navbar.Brand>
      {props.user ? (
        <>
          <Navbar.Brand>
            <Link className="text-white" onClick={() => handleLogout(props)} to="/">
              Logout
            </Link>
          </Navbar.Brand>
        </>
      ) : (
        <>
          <Navbar.Brand>
            <Link className="text-white" to="/signup">Signup</Link>
          </Navbar.Brand>
          {' '}
          <Navbar.Brand>
            <Link className="text-white" to="/login">Login</Link>
          </Navbar.Brand>
        </>
      )}
    </div>
  </div>
</nav>
  );
};

export default CustomNavbar;
