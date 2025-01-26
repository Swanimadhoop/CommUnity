import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import PostFeed from "./components/PostFeed";
import PostForm from "./components/PostForm";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);


  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>CommUnity!</h1>

        {!isLoggedIn ? (
          <>
            <Link to="/login">
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
                Login
              </button>
            </Link>
            <Link to="/signup" style={{ marginLeft: "10px" }}>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsLoggedIn(false)}
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
          </>
        )}


        <Routes>
          <Route path="/" element={<PostFeed isLoggedIn={isLoggedIn} posts={posts} />} />
          <Route path="/create" element={isLoggedIn ? <PostForm /> : <Navigate to="/" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;