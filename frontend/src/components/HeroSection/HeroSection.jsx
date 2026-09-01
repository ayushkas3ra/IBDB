import './HeroSection.css'
import SearchBar from '../SearchBar/SearchBar'

export default function HeroSection() {
  return (
    <div className="hero-main">
    <title>IBDB - Home</title>
      <div className="hero-title">Discover your next great read</div>
      <div className="hero-subtitle">
        Search thousands of books. Explore the most popular titles. Find your
        next title.
      </div>
      <SearchBar />
    </div>
  )
}
