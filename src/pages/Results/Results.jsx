import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useSearchParams, Link } from "react-router-dom";
import "./Results.css";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:5000/search", { user_input: query })
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>Loading...</h2>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>{error}</h2>
      </>
    );
  }

  if (results.length == 0) {
    return (
      <>
        <div className="search-box">
          <SearchBar />
        </div>
        <h2>Book not found in database, try with a different query</h2>
      </>
    );
  }

  return (
    <div className="results-page">
      <div className="search-box">
        <SearchBar />
      </div>
      <div className="heading">Results :</div>
      <div className="book-list">
        {results.map((book) => (
          <Link to={`/search/${book.id}`} key={book.id}>
            <div className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>
                <b>{book.title}</b>
              </h3>
              <br />
              <p>{book.author}</p>
              <p>{book.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Results;
