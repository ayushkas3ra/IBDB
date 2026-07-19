import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <div className="navbar-brand">IBDB</div>
      </Link>
      <div className="nav-links">
        <Link to="/signin">Sign-in</Link>
        {/* <Link to={isLogedin ? '/ailibrarian' : '/signin'}>AI Librarian</Link> */}
        <Link to="/librarian">AI Librarian</Link>
      </div>
    </nav>
  );
}

export default Nav;
