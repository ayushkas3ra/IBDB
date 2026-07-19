import React, { use } from "react";
import "./Home.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="home-container">
      <title>IBDB-Internet Book Database</title>
      <div className="search-box">
        <SearchBar />
      </div>
      <div className="heading">Most Popular:</div>
      <div className="book-list">
        {books.map((book) => (
          <Link key={book.id} to={`/book/${book.id}`} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>
              <b>{book.title}</b>
            </h3>
            <br />
            <p>{book.author}</p>
            <p>⭐ {book.rating}</p>
            <p>{book.genre}</p>
            <p>{book.votes} votes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Home;
