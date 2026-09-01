import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPopularBooks } from '../../api/books'
import { BOOK_PLACEHOLDER } from '../../constants/images'
import { ClipLoader } from 'react-spinners'
import './MostPopular.css'

export default function MostPopular() {
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
      <div className="mostPopular-main">
        <title>IBDB - Most popular</title>
        <div className="mostPopular-loadingSpinner">
          <ClipLoader color="#bbbb" loading={loading} size={50} />
        </div>
      </div>
    )
  }

  return (
    <div className="mostPopular-main">
      <title>IBDB - Most popular</title>
      <div className="mostPopular-container1">
        <div className="mostPopular-container1-title">
          <div className="mostPopular-container1-heading">
            Top 50 Most Popular Books
          </div>
          <div className="mostPopular-container1-subtitle">
            The most loved and highly rated books by our community.
          </div>
        </div>
        <div className="mostPopular-container1-infoCard">
          ⭐ Based on Ratings, Reviews & Community Popularity
        </div>
      </div>
      <div className="mostPopular-container2">
        <div className="mostPopular-bookList-header">
          <span className="mostPopular-bookList-header-column">#</span>
          <span className="mostPopular-bookList-header-column">Book</span>
          <span className="mostPopular-bookList-header-column">Author</span>
          <span className="mostPopular-bookList-header-column">Rating</span>
          <span className="mostPopular-bookList-header-column">Reviews</span>
          <span className="mostPopular-bookList-header-column">Genre</span>
        </div>
        <div className="mostPopular-bookList">
          {books.map((book, index) => (
            <Link
              key={book.isbn13}
              className="mostPopular-bookList-bookCard"
              to={`/book/${book.isbn13}`}
            >
              <div className="mostPopular-bookCard-index">{index + 1}</div>

              <div className="mostPopular-bookCard-bookCover">
                <div className="mostPopular-bookCard-bookImage">
                  <img
                    src={book.image || BOOK_PLACEHOLDER}
                    alt={book.title}
                    loading="lazy"
                  />
                </div>

                <div className="mostPopular-bookCard-bookDetails">
                  <div className="mostPopular-bookCard-bookTitle">
                    {book.title}
                  </div>

                  <div className="mostPopular-bookCard-bookAuthor">
                    {book.author}
                  </div>

                  <div className="mostPopular-bookCard-bookRating">
                    <span>⭐</span>
                    {book.rating} ({formatCount(book.rating_count)} votes)
                  </div>
                </div>
              </div>

              <div className="mostPopular-bookCard-bookAuthor desktop-only">
                {book.author}
              </div>

              <div className="mostPopular-bookCard-bookRating desktop-only">
                <span>⭐</span>
                {book.rating}
              </div>

              <div className="mostPopular-bookCard-bookReviews desktop-only">
                {book.rating_count}
              </div>

              <div className="mostPopular-bookCard-bookReleaseYear desktop-only">
                {book.genre}
              </div>

              <div className="mostPopular-bookCard-saveLaterSVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
