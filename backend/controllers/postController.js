import Post from "../models/Post.js"; // Assuming Post is your Mongoose model

// Fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch posts from the database
    res.status(200).json(posts); // Return posts as a JSON response
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching posts." });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newPost = new Post({
      title,
      description,
      category,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully!",
      post: savedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the post." });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
      const { postId } = req.params; // Extract the post ID from the URL
      const {  comment } = req.body; // Extract user and comment from the request body
  
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
      }
  
      // Add the new comment to the post's comments array
      post.comments.push({  comment });
      await post.save();
  
      res.status(200).json({ success: true, message: "Comment added successfully", post });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
