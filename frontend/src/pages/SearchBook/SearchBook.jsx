import React from 'react'
import './SearchBook.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ChatSection from '@/components/ChatSection/ChatSection'
import { ClipLoader } from 'react-spinners'

function Book() {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/search/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err))
  }, [id])

  if (!book) {
    return (
      <>
        <main className="book-main">
          <ClipLoader color="#bbbb" loading={loading} size={50} />
        </main>
      </>
    )
  }

  return (
    <main className="book-main">
      <div className="container1">
        <div className="book-title">{book.title}</div>
        <div className="book-details">
          <img
            src={book.image}
            alt={book.title}
            className="book-cover"
            loading="lazy"
          />
          <div className="book-info">
            <div className="book-author">
              <b>Author</b> : {book.author}
            </div>
            <div className="book-genre">
              <b>Genre</b> : {book.category}
            </div>
            <div className="book-ratings">
              <b>Rating</b> : ⭐{book.rating}/5
            </div>
            <div className="book-ratings-count">
              <b>Total Ratings</b> : {book.rating_count} votes
            </div>
            <div className="book-description">
              <b>Book-id</b> : {book.description}
            </div>
          </div>
        </div>
      </div>
      <div className="container2">
        <ChatSection bookTitle={book.title} />
      </div>
    </main>
  )
}

export default Book
