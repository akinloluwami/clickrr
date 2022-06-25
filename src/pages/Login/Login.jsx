import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="topbar">
        <div className="logo">
          <h1>Clickrr</h1>
        </div>
      </div>
      <form className="form">
        <h2>Login to your Clickrr</h2>
        <p className="error">Username or password is incorrect</p>
        <div className="input_container">
          <label htmlFor="username">clickrr.link/</label>
          <input
            type="email"
            name="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className={
            username.length < 3 || password.length < 8 ? "disabled" : ""
          }
          disabled={username.length < 3 || password.length < 8 ? true : false}
        >
          Login
        </button>
      </form>
      <div className="ctas">
        <Link to="/forgot-password">Forgot Password?</Link>
        <p>
          New to Clickrr? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
