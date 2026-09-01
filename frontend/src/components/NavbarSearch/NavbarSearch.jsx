import './NavbarSearch.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function NavbarSearch() {
  const [query, setQuery] = useState('')

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (!query.trim()) return

    navigate(`/results?query=${encodeURIComponent(query)}`)
  }

  return (
    <div className="navbarsearch-main">
      <form className="navbarsearch-form" onSubmit={handleSubmit}>
        <input
          className="navbarsearch-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="navbarsearch-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default NavbarSearch
