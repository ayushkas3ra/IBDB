import React from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { registerUser } from '@/api/auth'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')

  const navigate = useNavigate()

  async function handleSignin() {
    if (!name || !email || !username || !password || !confirmPassword) {
      alert('All fields are required')
    }
    // setError('')
    if (password != confirmPassword) {
      alert('Password does not match with confirm-password!')
      return
    }
    setLoading(true)
    try {
      await registerUser({ name, email, username, password })
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Something went wrong...')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <title>IBDB: Sign-up</title>
      <div className="signup-card">
        <div className="card-title">Create a new IBDB account</div>
        {/* {error && <p className="error-message">{error}</p>} */}
        <form className="signup-form" onSubmit={handleSignin}>
          <div className="input-group">
            {/* <label>Full Name</label> */}
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="input-group">
            {/* <label>Email</label> */}
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-group">
            {/* <label>Email</label> */}
            <input
              type="text"
              placeholder="Choose your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input-group">
            {/* <label>Password</label> */}
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="input-group">
            {/* <label>Confirm Password</label> */}
            <input
              type="text"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              vlaue={confirmPassword}
            />
          </div>
          <button className="signup-btn" type="submit">
            {loading ? 'Creating Account...' : 'Sign-up'}
          </button>
        </form>
      </div>
      <div className="form-footer">
        {/* <a href="/">Forgot Password</a> */}
        <p>
          Already have an account? <Link to="/signin">Sign-in</Link>
        </p>
      </div>
    </main>
  )
}
