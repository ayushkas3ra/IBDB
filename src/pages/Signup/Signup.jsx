import React from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <main>
      <title>IBDB: Sign-up</title>
      <div className="signup-card">
        <div className="card-title">Create a new IBDB account</div>
        <form className="signup-form" action="#">
          <div className="input-group">
            {/* <label>Full Name</label> */}
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            {/* <label>Email</label> */}
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            {/* <label>Password</label> */}
            <input type="password" placeholder="Enter your password" />
          </div>
          <div className="input-group">
            {/* <label>Confirm Password</label> */}
            <input type="password" placeholder="Confirm your password" />
          </div>
          <button className="sign-btn">Sign-up</button>
        </form>
      </div>
      <div className="form-footer">
        {/* <a href="/">Forgot Password</a> */}
        <p>
          Already have an account? <Link to="/signin">Sign-in</Link>
        </p>
      </div>
    </main>
  );
}
