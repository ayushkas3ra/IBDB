import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div>IBDB: Internet Book DataBase</div>
      <div className="footer-links">
        <a href="https://github.com/ayushkas3ra/IBDB" target="_blank">
          <span>Source Code</span>
        </a>
        <a href="mailto:ayushkasera.dev@gmail.com?subject=From%3A%20IMDB">
          <span>Contact</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
