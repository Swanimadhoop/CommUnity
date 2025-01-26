// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostFeed from "./components/PostFeed";
import PostForm from "./components/PostForm"; // Import PostForm

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulating login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulating logout
  };

  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Local Help Hub</h1>

        {/* Login/Logout Button */}
        {!isLoggedIn ? (
          <button
            onClick={handleLogin}
            style={{
              padding: "10px 15px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 15px",
              backgroundColor: "#FF5733",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}

        {/* Post Button (Only available when logged in) */}
        {isLoggedIn && (
          <Link to="/create">
            <button
              style={{
                padding: "10px 15px",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              Post +
            </button>
          </Link>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<PostFeed isLoggedIn={isLoggedIn} />} />
          <Route path="/create" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;