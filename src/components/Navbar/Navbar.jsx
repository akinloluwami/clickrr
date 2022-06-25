import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <span>C</span> clickrr
      </div>
      <div className="ctas">
        <Link to="/login">Login</Link>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
