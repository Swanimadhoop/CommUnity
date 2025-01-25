import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch posts whenever the category changes
  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      // Fetch posts from the backend
      const response = await axios.get('http://localhost:4000/api/v1/posts');
      const allPosts = response.data;

      // Filter posts by selected category
      const filteredPosts =
        category === 'All'
          ? allPosts
          : allPosts.filter((post) => post.category === category);
      
      setPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleLogin = () => {
    setIsLoggedIn(true); // Simulating login for now
  };

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
      {!isLoggedIn ? (
        <button style={buttonStyles} onClick={handleLogin}>Login</button>
      ) : (
        <>
          <div>
            <button style={buttonStyles} onClick={() => handleCategoryChange('All')}>All</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Lend Items')}>Lend Items</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Services')}>Services</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('General')}>General</button>
            <button style={buttonStyles} onClick={() => handleCategoryChange('Pay for Work')}>Pay for Work</button>
          </div>

          <button
            style={buttonStyles}
            onClick={() => alert('Redirect to Post Form')}
          >
            Post a Request
          </button>
        </>
      )}

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} style={postStyles}>
              <h3>{post.title}</h3>
              <h5>{post.description}</h5>
              <div>
                <button style={actionButtonStyles}>Comment</button>
                <button style={actionButtonStyles}>Chat</button>
                <button style={actionButtonStyles}>❤️</button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
