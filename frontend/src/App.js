// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaComment, FaEnvelope, FaHeart } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PostForm from "./components/PostForm"; // Import the PostForm component


function App() {
  const [posts, setPosts] = useState([]); // Store posts
  const [category, setCategory] = useState("All"); // Active category
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on the selected category
  const filteredPosts =
    category === "All" ? posts : posts.filter((post) => post.category === category);

  const handleLogin = () => {
    // Simulating login, you would replace this with actual authentication logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Simulating logout
    setIsLoggedIn(false);
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

        {/* Render Post Feed Only on Home Route */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Filter Buttons */}
                <div style={{ marginBottom: "20px" }}>
                  {["All", "Lend Items", "Services", "General", "Pay for Work"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      style={{
                        padding: "10px 15px",
                        margin: "0 10px 10px 0",
                        backgroundColor: category === cat ? "#007BFF" : "#f0f0f0",
                        color: category === cat ? "#fff" : "#000",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Post Feed */}
                <div>
                  {filteredPosts.length === 0 ? (
                    <p>No posts available in this category.</p>
                  ) : (
                    filteredPosts.map((post) => (
                      <div
                        key={post._id}
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          padding: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <h3>{post.title}</h3>
                        <p>Category: {post.category}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <FaComment /> Comment
                          </button>
                          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <FaEnvelope /> Chat
                          </button>
                          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                            <FaHeart /> Love
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            }
          />
          <Route path="/create" element={<PostForm />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
