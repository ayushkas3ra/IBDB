import React from 'react'
import './Book.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatSection from '@/components/ChatSection/ChatSection'
import { getBook, getSimilarBooks } from '@/api/books'
import { BOOK_PLACEHOLDER } from '@/constants/images'
import { ClipLoader } from 'react-spinners'

function Book() {
  const { isbn13 } = useParams()
  const [book, setBook] = useState(null)
  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      try {
        // Synchronize both requests
        const [bookData, similarData] = await Promise.all([
          getBook(isbn13),
          getSimilarBooks(isbn13),
        ])
        setBook(bookData)
        setSimilarBooks(similarData)
      } catch (error) {
        console.error(error)
      } finally {
        window.scrollTo(0, 0)
        setLoading(false)
      }
    }
    fetchBook()
  }, [isbn13])

  if (loading) {
    return (
      <main className="book-main">
        <ClipLoader color="#bbbb" loading={loading} size={50} />
      </main>
    )
  }

  return (
    <div className="main-container-book">
      <div className="book-outer">
        <div className="book-container1">
          <div className="book-title">{book.title}</div>
          <div className="book-details-home">
            <img
              src={
                book.image ||
                'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
              }
              alt={book.title}
              className="book-cover"
              loading="lazy"
            />
            <div className="book-info">
              <div className="book-author">
                <b>Author</b> : {book.author}
              </div>
              <div className="book-genre">
                <b>Genre</b> : {book.genre}
              </div>
              <div className="book-ratings">
                <b>Rating</b> : ⭐{book.rating}/5
              </div>
              <div className="book-ratings-count">
                <b>Total Votes</b> : {book.rating_count}
              </div>
              <div className="book-description">
                <b>Description</b> : {book.description}
              </div>
            </div>
          </div>
        </div>
        <div className="book-container2">
          <ChatSection key={isbn13} isbn13={book.isbn13} />
        </div>
      </div>
      <div className="similarBooks-section">
        <div className="heading">Similar Books:</div>
        <div className="book-list">
          {similarBooks.map((similarBook) => (
            <Link
              key={similarBook.isbn13}
              to={`/book/${similarBook.isbn13}`}
              className="book-card-results"
            >
              <img
                src={similarBook.image || BOOK_PLACEHOLDER}
                alt={similarBook.title}
                loading="lazy"
              />
              <h3>
                <b>
                  {book.title}-<i>{book.author}</i>
                </b>
              </h3>
              <p>⭐ {book.rating}</p>
              <p>{book.genre}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Book
