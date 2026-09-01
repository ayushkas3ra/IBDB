import { Link } from 'react-router-dom'
import './ComingSoon.css'

export default function ComingSoon() {
  return (
    <div className="comingSoon-main">
      <title>IBDB - Coming Soon</title>
      <div className="container1"></div>
      <div className="container2">
        <div className="comingSoon-heading">🔨⚙️</div>
        <div className="comingSoon-subHeading">Coming Soon</div>
        <div className="comingSoon-paragraph">
          This page is currently under development please come again later.
        </div>
        <Link to="/" className="comingSoon-home-btn">
          <span className="arrow leftArrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M41.4 297.4C28.9 309.9 28.9 330.2 41.4 342.7L169.4 470.7C181.9 483.2 202.2 483.2 214.7 470.7C227.2 458.2 227.2 437.9 214.7 425.4L141.3 352L576 352C593.7 352 608 337.7 608 320C608 302.3 593.7 288 576 288L141.3 288L214.7 214.6C227.2 202.1 227.2 181.8 214.7 169.3C202.2 156.8 181.9 156.8 169.4 169.3L41.4 297.3z" />
            </svg>
          </span>
          Back to home
        </Link>
        <Link to="/popular" className="comingSoon-browseBooks-btn">
          <span className="arrow rightArrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z" />
            </svg>
          </span>
          Most Popular
        </Link>
      </div>
    </div>
  )
}
