import ImageContainerInfo from '../ImageContainerInfo/ImageContainerInfo'
import './Signup.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/auth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

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
    <div className="signup-main">
      <title>IBDB - Sign Up</title>
      <div className="signup-image-container">
        <div className="signup-image-container-overlay">
          <div className="signup-heading">
            Join <span>IBDB</span>
          </div>
          <div className="signup-subheading">
            Create your account & start your journey of discovery.
          </div>
          <div className="signup-image-container-information">
            <ImageContainerInfo />
          </div>
        </div>
      </div>
      <div className="signup-form-container">
        <div className="signup-container1">
          <div className="signup-heading">Sign Up</div>
          <div className="signup-paragraph">
            Create your account to get started
          </div>
        </div>
        <div className="signup-container2">
          <form className="signup-form" onSubmit={handleSignin}>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <input
              type="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="text"
              placeholder="Create your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              vlaue={confirmPassword}
            />
            <button className="signup-btn" disabled={loading} type="submit">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className="signup-container3">
          <div className="signup-question">
            Already have an account?{' '}
            <Link to="/signin" className="signup-redirect-btn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
