import React from "react";
import "./Signin.css";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <main>
      <title>IBDB: Sign-in</title>
      <div className="signin-card">
        <div className="card-title">Sign-in to your account</div>
        <form className="signin-form" action="#">
          <div className="input-group">
            {/* <label>Email</label> */}
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            {/* <label>Password</label> */}
            <input type="password" placeholder="Enter your password" />
          </div>
          <button className="sign-btn">Sign-in</button>
        </form>
      </div>
      <div className="form-footer">
        {/* <a href="/">Forgot Password</a> */}
        <p>
          Don't have an account? <Link to="/signup">Sign-up</Link>
        </p>
      </div>
    </main>
  );
}
