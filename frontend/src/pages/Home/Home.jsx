import './Home.css'
import SearchBar from '@/components/SearchBar/SearchBar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPopularBooks } from '@/api/books'
import { BOOK_PLACEHOLDER } from '@/constants/images'

function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await getPopularBooks()
        setBooks(books)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBooks()
  }, [])

  if (!books) {
    return (
      <div className="home-container">
        <title>IBDB-Internet Book Database</title>
        <div className="search-box">
          <SearchBar />
        </div>
        <div className="heading-home">Most Popular:</div>
        <div className="book-list">
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <title>IBDB-Internet Book Database</title>
      <div className="search-box">
        <SearchBar />
      </div>
      <div className="heading-home">Most Popular:</div>
      <div className="book-list">
        {books.map((book) => (
          <Link key={book.id} to={`/book/${book.isbn13}`} className="book-card">
            <img src={book.image || BOOK_PLACEHOLDER} alt={book.title} />
            <h3>
              <b>{book.title}</b>
            </h3>
            <br />
            <p>{book.author}</p>
            <p>⭐ {book.rating}</p>
            <p>{book.genre}</p>
            <p>{book.rating_count} votes</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
export default Home
