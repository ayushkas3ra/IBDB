import React from 'react'
import './Book.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChatSection from '@/components/ChatSection/ChatSection'
import { getBook, getSimilarBooks } from '@/api/books'
import { BOOK_PLACEHOLDER } from '@/constants/images'

function Book() {
  const { isbn13 } = useParams()
  const [book, setBook] = useState(null)
  const [similarBooks, setSimilarBooks] = useState([])

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
      }
    }
    fetchBook()
  }, [isbn13])

  if (!book) {
    return (
      <>
        <main className="book-main">
          <h2>Loading...</h2>
        </main>
      </>
    )
  }

  return (
    <div className="main-container-book">
      <div className="book-outer">
        <div className="book-container1">
          <div className="book-title">{book.title}</div>
          <div className="book-details">
            <img
              src={
                book.image ||
                'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
              }
              alt={book.title}
              className="book-cover"
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
              className="book-card"
            >
              <img
                src={similarBook.image || BOOK_PLACEHOLDER}
                alt={similarBook.title}
              />
              <h3>
                <b>{similarBook.title}</b>
              </h3>
              <br />
              <p>{similarBook.author}</p>
              <p>⭐ {similarBook.rating}</p>
              <p>{similarBook.genre}</p>
              <p>{similarBook.rating_count} votes</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Book
