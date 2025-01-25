import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // For redirection

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // React Router navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      category,
    };

    try {
      // Send the post data to the backend
      const response = await axios.post("http://localhost:4000/api/v1/posts", newPost);
      
      if (response.status === 201) {
        // If the post is successfully saved, show the success message
        setMessage("Post successfully created!");
        
        // Redirect to the post feed page after 1.5 seconds
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ padding: "5px", margin: "5px", width: "300px" }}
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ padding: "5px", margin: "5px", width: "300px", height: "100px" }}
            />
          </label>
        </div>

        <div>
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ padding: "5px", margin: "5px" }}
            >
              <option value="All">All</option>
              <option value="Lend Items">Lend Items</option>
              <option value="Services">Services</option>
              <option value="General">General</option>
              <option value="Pay for Work">Pay for Work</option>
            </select>
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          Submit Post
        </button>
      </form>

      {/* Display success/error message */}
      {message && (
        <p
          style={{
            marginTop: "10px",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default PostForm;
