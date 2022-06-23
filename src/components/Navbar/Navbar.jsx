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
        <p>Login</p>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
