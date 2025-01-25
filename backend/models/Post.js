import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
}, {
  timestamps: true, // To keep track of when the post was created or updated
});

const Post = mongoose.model("Post", postSchema);

export default Post;
