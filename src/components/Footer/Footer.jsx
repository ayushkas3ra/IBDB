import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div>IBDB: Internet Book DataBase</div>
      <div className="footer-links">
        <a href="/" target="_blank">
          <span>Source Code</span>
        </a>
        <a href="/">
          <span>Contact</span>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
