import React from 'react'
import './Signin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { login } from '@/api/auth'
import { useNavigate } from 'react-router-dom'

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e) {
    if (!username || !password) {
      alert('Username or password is empty')
      return
    }
    e.preventDefault()
    setLoading(true)
    // setError('')

    try {
      const response = await login({ username, password })
      localStorage.setItem('refresh', response.refresh)
      localStorage.setItem('access', response.access)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-container">
      <title>IBDB: Sign-in</title>
      <div className="signin-card">
        <div className="card-title">Sign-in to your account</div>
        {/* {error && <p className="error-message">{error}</p>} */}
        <form className="signin-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="signin-btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign-in'}
          </button>
        </form>
      </div>
      <div className="form-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign-up</Link>
        </p>
      </div>
    </div>
  )
}
