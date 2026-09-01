import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import './Navbar.css'
import NavbarSearch from '../NavbarSearch/NavbarSearch'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { isLoggedIn } = useAuth()

  const toggleSearch = () => {
    setShowSearchBar(!showSearchBar)
  }

  return (
    <div className="nav-main">
      <div className="nav-container1">
        <div className="nav-logo">
          <img src={logo} />
        </div>
        <div className="nav-title">Internet Book DataBase</div>
      </div>
      <div className="nav-container2">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Home
        </NavLink>

        <NavLink
          to="/popular"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Top 50
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          Contact
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          About
        </NavLink>
      </div>
      <div className="nav-container3">
        {showSearchBar ? (
          <div className="nav-searchbar">
            <NavbarSearch />
          </div>
        ) : (
          ''
        )}
        {showSearchBar ? (
          <button className="nav-btn nav-close-btn" onClick={toggleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
            </svg>
          </button>
        ) : (
          <button className="nav-btn nav-search-btn" onClick={toggleSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
            </svg>
          </button>
        )}
        {isLoggedIn ? (
          <Link className="nav-btn nav-profile" to="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" />
            </svg>
          </Link>
        ) : (
          <Link className="nav-signin" to="/signin">
            SignIn
          </Link>
        )}
      </div>
    </div>
  )
}
