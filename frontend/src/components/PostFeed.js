import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch posts whenever the category or login state changes
  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:5000/api/posts`);
    setPosts(response.data);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulating login for now
  };

  // Inline styles for components
  const postStyles = {
    border: '1px solid #ddd',
    padding: '20px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyles = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    margin: '5px',
  };

  const actionButtonStyles = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    border: '1px solid #ddd',
    padding: '8px 12px',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Login button (visible if not logged in) */}
      {!isLoggedIn ? (
        <button style={buttonStyles} onClick={handleLogin}>Login</button>
      ) : (
        <>
          {/* Category buttons */}
          <div>
            <button style={buttonStyles} onClick={() => handleCategoryChange('All')}>All</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Lend/Borrow')}>Lend/Borrow</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Services')}>Services</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('General')}>General</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Pay for Work')}>Pay for Work</button>
          </div>

          {/* "Post a Request" button */}
          <button style={buttonStyles} onClick={() => alert('Post request')}>Post a Request</button>
        </>
      )}

      {/* Post feed */}
      <div>
        {posts.map(post => (
          <div key={post._id} style={postStyles}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p><strong>Category:</strong> {post.category}</p>

            {/* Action buttons: Comment, Chat, Love */}
            <div>
              <button style={actionButtonStyles}>Comment</button>
              <button style={actionButtonStyles}>Chat</button>
              <button style={actionButtonStyles}>❤️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
