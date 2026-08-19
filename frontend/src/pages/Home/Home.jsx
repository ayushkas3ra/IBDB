import './Home.css'
import SearchBar from '@/components/SearchBar/SearchBar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPopularBooks } from '@/api/books'
import { BOOK_PLACEHOLDER } from '@/constants/images'
import { ClipLoader } from 'react-spinners'

function Home() {
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
      <div className="home-container">
        <title>IBDB-Internet Book Database</title>
        <div className="search-box">
          <SearchBar />
        </div>
        <div className="heading-home">Most Popular:</div>
        <div className="book-list">
          <ClipLoader color="#bbbb" loading={loading} size={50} />
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
      <div className="book-list-home">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.isbn13}`}
            className="book-card-home"
          >
            <img
              src={book.image || BOOK_PLACEHOLDER}
              alt={book.title}
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
  )
}
export default Home
