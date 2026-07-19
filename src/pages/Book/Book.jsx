import React from "react";
import "./Book.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/book/${id}`)
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
        <div class="ai-card">
          <div class="chat-box">
            <div class="message-row receiver">
              <div class="message-bubble">
                🤖: Hello! Welcome to IBDB, How can I help you today?
              </div>
            </div>
          </div>
          <div class="ai-card2">
            <form class="chat-form">
              <input class="ai_input" type="text" />
              <button class="send-btn" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Book;
