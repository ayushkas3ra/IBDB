import './Profile.css'
import { getMe } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AVATAR_PLACEHOLDER, BOOK_PLACEHOLDER } from '../../constants/images'
import { ClipLoader } from 'react-spinners'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [openSidebarBar, SetOpenSideBar] = useState(false)
  const navigate = useNavigate()
  const [savedBooks, setSavedBooks] = useState([])
  const [loading, setLoading] = useState(false)

  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  useEffect(() => {
    const token = localStorage.getItem('access')
    if (!token) return
    async function fetchUser() {
      setLoading(true)
      try {
        const response = await getMe()
        setUser(response)
        console.log(response)
      } catch (error) {
        setUser(null)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className="profile-main-loading">
        <ClipLoader color="#bbbb" loading={loading} size={50} />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="profile-main">
        <div className="profile-noUser-title">
          Sign into your account to see your profile
        </div>
        <Link to="/signin" className="profile-noUser-signinBtn">
          Sign In
        </Link>
        <Link to="/" className="profile-noUser-backToHomeBtn">
          <span className="profile-noUser-backToHomeBtn-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z" />
            </svg>
          </span>
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="profile-main">
      {openSidebarBar ? (
        <div className="profile-sidebar">
          <button
            className="profile-sidebar-closeBtn"
            onClick={() => SetOpenSideBar(() => SetOpenSideBar(false))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" />
            </svg>
          </button>
          <div className="profile-sidebar-linksContainer">
            <NavLink className="profile-sidebar-link" to="/profile">
              <span className="profile-sidebar-link-SVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                </svg>
              </span>
              Profile
            </NavLink>
            <NavLink className="profile-sidebar-link" to="/coming-soon">
              <span className="profile-sidebar-link-SVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z" />
                </svg>
              </span>
              Saved Books
            </NavLink>
            <NavLink className="profile-sidebar-link" to="/coming-soon">
              <span className="profile-sidebar-link-SVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
                </svg>
              </span>
              Reviews
            </NavLink>
            <NavLink className="profile-sidebar-link" to="/coming-soon">
              <span className="profile-sidebar-link-SVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                </svg>
              </span>
              Settings
            </NavLink>
            <Link className="profile-sidebar-link" onClick={handleLogout}>
              <span className="profile-sidebar-link-SVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" />
                </svg>
              </span>
              Logout
            </Link>
          </div>
        </div>
      ) : (
        ''
      )}
      {openSidebarBar ? (
        ''
      ) : (
        <button
          className="profile-sidebar-openBtn"
          onClick={() => SetOpenSideBar(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
          </svg>
        </button>
      )}
      <div className="profile-container">
        <div className="profile-details">
          <div className="profile-details-title">Profile</div>
          <div className="profile-details-container">
            <div className="profile-details-container-avatar">
              <img
                src={user.image || AVATAR_PLACEHOLDER}
                alt={user.username}
                loading="lazy"
              />
            </div>
            <div className="profile-details-container-user">
              <div className="profile-details-continer-user-fullName">
                Name is empty
                <Link
                  className="profile-details-container-user-editProfileBtn"
                  to="#"
                >
                  Edit Profile
                </Link>
              </div>
              <div className="profile-details-continer-user-username">
                {user.username}
              </div>
              <div className="profile-details-continer-user-bio">
                {user.email}
              </div>
              <div className="profile-details-continer-user-location">
                <span className="profile-details-continer-user-location-SVG">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z" />
                  </svg>
                </span>
                My Location
              </div>
            </div>
          </div>
        </div>
        <div className="profile-mySavedBooks-container">
          {savedBooks ? (
            <div className="profile-mySavedBooks">
              {savedBooks.slice(0, 5).map((book) => (
                <div className="profile-mySavedBooks-list">
                  <Link
                    className="profile-mySavedBooks-bookCard"
                    key={book.id}
                    to={`/book/${book.isbn13}`}
                  >
                    <div className="profile-mySavedBooks-bookCard-img">
                      {' '}
                      <img
                        src={book.image || BOOK_PLACEHOLDER}
                        alt={book.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="profile-mySavedBooks-bookCard-bookinfoContainer">
                      <div className="profile-mySavedBooks-bookCard-booktitle">
                        {book.title} ({book.author})
                      </div>
                      <div className="profile-mySavedBooks-bookCard-bookratings">
                        ⭐{book.rating}
                      </div>
                      <div className="profile-mySavedBooks-bookCard-bookgenre">
                        {book.genre}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="profile-mySavedBooks-empty">Empty</div>
          )}
        </div>
      </div>
    </div>
  )
}
