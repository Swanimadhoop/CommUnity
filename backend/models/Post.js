import mongoose from "mongoose";

// Define a schema for comments
const commentSchema = new mongoose.Schema({
  
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the main schema for posts
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [commentSchema], // Embedding comments into the post schema
  },
  {
    timestamps: true, // To keep track of when the post was created or updated
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;