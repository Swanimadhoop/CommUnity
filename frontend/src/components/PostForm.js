// PostForm.js
import React, { useState } from "react";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("All");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      title,
      description,
      category,
    };

    console.log("New Post Created:", newPost);
    // Send this new post to the backend, for example:
    // axios.post('http://localhost:5000/api/posts', newPost);
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
    </div>
  );
};

export default PostForm;
