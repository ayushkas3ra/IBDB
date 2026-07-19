import React from "react";
import "./SearchBook.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SearchBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/search/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!book) {
    return (
      <>
        <main className="book-main">
          <h2>Loading...</h2>
        </main>
      </>
    );
  }

  return (
    <main className="book-main">
      <div className="container1">
        <div className="book-title">{book.title}</div>
        <div className="book-details">
          <img src={book.image} alt={book.title} className="book-cover" />
          <div className="book-description">
            <div className="book-author">
              <b>Author</b> : {book.author}
            </div>
            <div className="book-genre">
              <b>Genre</b> : {book.category}
            </div>
            <div className="book-ratings">
              <b>Ratings</b> : ⭐{book.rating}/5
            </div>
            <div className="book-ratings-count">
              <b>Total Ratings</b> : {book.rating_count}
            </div>
          </div>
        </div>
      </div>
      <div className="container2">
        <div className="librarian-title">AI Librarian</div>
        <div className="chat-area">Chat Area</div>
      </div>
    </main>
  );
}

export default SearchBook;
