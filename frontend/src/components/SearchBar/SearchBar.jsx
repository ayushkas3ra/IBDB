import React from "react";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/results?query=${encodeURIComponent(query)}`);
  }

  return (
    <main className="search-container-main">
      <form onSubmit={handleSubmit} className="search-form">
        <label>Search in the collection of 6000+ books...</label>
        <div className="search-container">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Books.."
          />
          <button type="submit">Go</button>
        </div>
      </form>
    </main>
  );
}

export default SearchBar;
