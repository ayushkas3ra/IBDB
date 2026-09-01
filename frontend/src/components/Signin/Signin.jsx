import ImageContainerInfo from '../ImageContainerInfo/ImageContainerinfo'
import './Signin.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth'
import { useAuth } from '../../context/AuthContext'

export default function Signin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { login: authLogin } = useAuth()

  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    if (!username || !password) {
      alert('Username or password is empty')
      return
    }
    setLoading(true)
    // setError('')

    try {
      const response = await login({ username, password })
      authLogin(response.access, response.refresh)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signin-main">
      <title>IBDB - Sign In</title>
      <div className="signin-image-container">
        <div className="signin-image-container-overlay">
          <div className="signin-heading">
            Welcome <span>Back</span>
          </div>
          <div className="signin-subheading">
            Sign in to continue discovering amazing books
          </div>
          <div className="signin-image-container-information">
            <ImageContainerInfo />
          </div>
        </div>
      </div>
      <div className="signin-form-container">
        <div className="signin-container1">
          <div className="signin-heading">Sign In</div>
          <div className="signin-paragraph">
            Enter your credentials to access your account
          </div>
        </div>
        <div className="signin-container2">
          <form className="signin-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="signin-btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <div className="signin-container3">
          <div className="signin-question">
            Don't have an account?{' '}
            <Link to="/signup" className="signup-redirect-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
