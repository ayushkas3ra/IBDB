import React from "react";
import Home from "./pages/Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Contact from "./pages/Contact/Contact";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Book from "./pages/Book/Book";
import AILibrarian from "./pages/AILibrarian/AILibrarian";
import Results from "./pages/Results/Results";
import SearchBook from "./pages/SearchBook/SearchBook";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="#" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/librarian" element={<AILibrarian />} />
          <Route path="/results" element={<Results />} />
          <Route path="search/:id" element={<SearchBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
