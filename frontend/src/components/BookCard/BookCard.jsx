import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPopularBooks } from '../../api/books'
import { BOOK_PLACEHOLDER } from '../../constants/images'
import { ClipLoader } from 'react-spinners'
import './BookCard.css'

export default function BookCard() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await getPopularBooks()
        setBooks(books)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchBooks()
  }, [])

  if (loading) {
    return (
      <div className="bookcard-main">
        <title>IBDB - Home</title>
        <div className="bookcard-container1">
          <div>Top 50 Most Popular Books</div>
          <Link>
            View All
            <span className="bookcard-viewall-arrow">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
              </svg>
            </span>
          </Link>
        </div>
        <div className="bookcard-loadingSpinner">
          <ClipLoader color="#bbbb" loading={loading} size={50} />
        </div>
      </div>
    )
  }

  return (
    <div className="bookcard-main">
      <title>IBDB - Home</title>
      <div className="bookcard-container1">
        <div>Top 50 Most Popular Books</div>
        <Link to="/popular">
          View All
          <span className="bookcard-viewall-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" />
            </svg>
          </span>
        </Link>
      </div>
      <div className="bookcard-container2">
        {books.slice(0, 10).map((book) => (
          <Link
            className="bookcard-card"
            key={book.id}
            to={`/book/${book.isbn13}`}
          >
            <div className="bookcard-card-img">
              {' '}
              <img
                src={book.image || BOOK_PLACEHOLDER}
                alt={book.title}
                loading="lazy"
              />
            </div>
            <div className="bookcard-card-bookinfo">
              <div className="bookcard-booktitle">
                {book.title} ({book.author})
              </div>
              {/* <div className="bookcard-bookauthor"></div> */}
              <div className="bookcard-bookratings">⭐{book.rating}</div>
              <div className="bookcard-bookgenre">{book.genre}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
