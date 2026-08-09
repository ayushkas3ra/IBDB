import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMe, logout } from '@/api/auth'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) return
    async function fetchUser() {
      try {
        const response = await getMe()
        setUser(response)
        navigate('/')
      } catch (error) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/')
  }

  return (
    <nav>
      <Link to="/">
        <div className="navbar-brand">IBDB</div>
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            Hello {user.username} <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/signin">Sign-in</Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
