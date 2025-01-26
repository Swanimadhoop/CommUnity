import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaComment, FaEnvelope, FaHeart } from "react-icons/fa";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate} from "react-router-dom";
import PostForm from "./components/PostForm"; 
import SignUp from "./components/SignUp"; 
import LogIn from "./components/LogIn";

function App() {
  const [posts, setPosts] = useState([]); 
  const [category, setCategory] = useState("All"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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

  const filteredPosts =
    category === "All" ? posts : posts.filter((post) => post.category === category);

  return (
    <Router>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Local Help Hub</h1>

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
              onClick={() => {
                setIsLoggedIn(false);
                Navigate("/");  // Redirect to the feed page on logout
              }}
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
          <Route
            path="/"
            element={
              <div>
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
                        <p>{post.description}</p>
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
          {/* Protected Route for Post Form */}
          <Route path="/create" element={isLoggedIn ? <PostForm /> : <Navigate to="/" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;