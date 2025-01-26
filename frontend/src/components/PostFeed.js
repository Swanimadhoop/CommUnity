import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaComment, FaHeart, FaEnvelope } from "react-icons/fa";
//import ChatMessages from "./ChatMessages"; // Import ChatMessages component

const PostFeed = ({ isLoggedIn }) => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("All");
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [commentingPostId, setCommentingPostId] = useState(null);
  const [lovedPosts, setLovedPosts] = useState({});
  const [viewMoreComments, setViewMoreComments] = useState({});
  //const [showChat, setShowChat] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // Fetch posts from the backend
  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/posts");
      const allPosts = response.data;

      // Filter posts by category
      const filteredPosts =
        category === "All"
          ? allPosts
          : allPosts.filter((post) => post.category === category);

      setPosts(filteredPosts);

      // Initialize comments state for each post
      const initialComments = {};
      filteredPosts.forEach((post) => {
        initialComments[post._id] = post.comments || [];
      });
      setComments(initialComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleAddComment = async (postId) => {
    const commentText = newComment[postId]?.trim();
    if (commentText !== "") {
      const tempComment = {
        comment: commentText,
        _id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      // Optimistically update comments UI
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), tempComment],
      }));

      try {
        const response = await axios.post(
          `http://localhost:4000/api/v1/posts/${postId}/comments`,
          { comment: commentText }
        );

        const savedComment = response.data;

        // Replace temporary comment with the saved comment
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: prevComments[postId].map((c) =>
            c._id === tempComment._id ? savedComment : c
          ),
        }));
      } catch (error) {
        console.error("Error adding comment:", error);
      }

      setNewComment((prev) => ({ ...prev, [postId]: "" }));
      setCommentingPostId(null);
    }
  };

  const handleInputChange = (postId, value) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleHeartClick = (postId) => {
    setLovedPosts((prevLovedPosts) => ({
      ...prevLovedPosts,
      [postId]: !prevLovedPosts[postId],
    }));
  };

  const handleViewMoreClick = (postId) => {
    setViewMoreComments((prev) => ({
      ...prev,
      [postId]: true,
    }));
  };

  // const handleChatButtonClick = (postId) => {
  //   setSelectedPostId(postId);
  //   setShowChat(true);
  // };

  return (
    <div style={{ padding: "20px" }}>
      {/* Category Filter Buttons */}
      <div style={{ marginBottom: "20px" }}>
        {["All", "Lend Items", "Services", "General", "Pay for Work"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
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
          )
        )}
      </div>

      {/* Post Feed */}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <button
                  onClick={() => setCommentingPostId(post._id)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <FaComment /> Comment
                </button>
                <button
                  //onClick={() => handleChatButtonClick(post._id)}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <FaEnvelope /> Chat
                </button>
                <button
                  onClick={() => handleHeartClick(post._id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: lovedPosts[post._id] ? "red" : "black",
                  }}
                >
                  <FaHeart /> Love
                </button>
              </div>

              {/* Comments Section */}
              <div>
                {comments[post._id] && comments[post._id].length > 0 ? (
                  <>
                    {(viewMoreComments[post._id]
                      ? comments[post._id]
                      : comments[post._id].slice(0, 2)
                    ).map((comment, index) => (
                      <div key={index}>
                        <p>{comment.comment}</p>
                      </div>
                    ))}

                    {comments[post._id].length > 2 &&
                      !viewMoreComments[post._id] && (
                        <button
                          onClick={() => handleViewMoreClick(post._id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#007BFF",
                            cursor: "pointer",
                          }}
                        >
                          View More Comments
                        </button>
                      )}
                  </>
                ) : (
                  <p>No comments yet.</p>
                )}

                {/* Add Comment Input */}
                {commentingPostId === post._id && (
                  <div>
                    <input
                      type="text"
                      value={newComment[post._id] || ""}
                      onChange={(e) =>
                        handleInputChange(post._id, e.target.value)
                      }
                      placeholder="Add a comment..."
                      style={{
                        padding: "8px",
                        width: "200px",
                        marginRight: "10px",
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      style={{
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        padding: "5px 10px",
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No posts available in this category.</p>
        )}
      </div>

      {/* Chat Component
      {showChat && selectedPostId && (
        <ChatMessages postId={selectedPostId} closeChat={() => setShowChat(false)} />
      )} */}
    </div>
  );
};

export default PostFeed;
