import './Results.css'
import { searchBooks } from '../../api/books'
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar'
import { BOOK_PLACEHOLDER } from '../../constants/images'
import { ClipLoader } from 'react-spinners'

export default function Results() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()

  const query = searchParams.get('query')

  useEffect(() => {
    async function fetchResults() {
      try {
        const results = await searchBooks(query)
        setResults(results)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [query])

  function formatCount(count) {
    if (count >= 1_000_000) {
      return `${parseFloat((count / 1_000_000).toFixed(1))}m`
    }
    if (count >= 1_000) {
      return `${parseFloat((count / 1_000).toFixed(1))}k`
    }
    return count.toString()
  }

  if (loading) {
    return (
      <div className="results-main">
        <title>IBDB - Results</title>
        <div className="results-container1">
          <div className="results-title">Search results for </div>
          <SearchBar />
        </div>
        <div className="results-container2">
          <ClipLoader color="#bbbb" loading={loading} size={50} />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="results-main">
        <title>IBDB - Results</title>
        <div className="results-container1">
          <div className="results-title">Search results for </div>
          <SearchBar />
        </div>
        <div className="results-container2">{error}</div>
      </div>
    )
  }

  if (results.length == 0) {
    return (
      <div className="results-main">
        <title>IBDB - Results</title>
        <div className="results-container1">
          <div className="results-title">Search results for </div>
          <SearchBar />
        </div>
        <div className="results-container2">
          <h2>Book not found in database, try with a different query</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="results-main">
      <title>IBDB - Results</title>
      <div className="results-container1">
        <div className="results-title">
          Search results for <span>"{query}"</span>
        </div>
        <SearchBar />
      </div>
      <div className="results-container2">
        {results.map((book) => (
          <Link
            to={`/book/${book.isbn13}/`}
            key={`/book/${book.isbn13}`}
            className="results-bookCard"
          >
            <div className="results-bookCard-imageContainer">
              <img
                className="results-bookCard-image"
                src={book.image || BOOK_PLACEHOLDER}
                alt={book.title}
              />
            </div>
            <div className="results-bookCard-bookInfo">
              <div className="results-bookCard-bookTitle">{book.title}</div>
              <div className="results-bookCard-bookAuthor">{book.author}</div>
              <div className="results-bookCard-bookRatings">
                ⭐{book.rating} ({formatCount(book.rating_count)} votes)
              </div>
              <div className="results-bookCard-bookGenre">{book.genre}</div>
              <div className="results-bookCard-bookDescription">
                {book.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
