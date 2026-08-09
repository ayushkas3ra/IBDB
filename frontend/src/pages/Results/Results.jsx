import React from 'react'
import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar/SearchBar'
import { useSearchParams, Link } from 'react-router-dom'
import './Results.css'
import { searchBooks } from '@/api/books'
import { BOOK_PLACEHOLDER } from '@/constants/images'

function Results() {
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
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [query])

  if (loading) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>Loading...</h2>
      </>
    )
  }

  if (error) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>{error}</h2>
      </>
    )
  }

  if (results.length == 0) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>Book not found in database, try with a different query</h2>
      </>
    )
  }

  return (
    <div className="results-page">
      <div className="search-box">
        <SearchBar />
      </div>
      <div className="heading-results">Results :</div>
      <div className="book-list">
        {results.map((book) => (
          <Link to={`/book/${book.isbn13}/`} key={book.isbn13}>
            <div className="book-card">
              <img src={book.image || BOOK_PLACEHOLDER} alt={book.title} />
              <h3>
                <b>{book.title}</b>
              </h3>
              <br />
              <p>{book.author}</p>
              <p>{book.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Results
