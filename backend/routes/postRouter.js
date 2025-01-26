import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { addComment } from "../controllers/postController.js";

const router = express.Router();

// Define routes
router.get("/", getPosts); // Route to fetch posts
router.post("/", createPost); // Route to create a post
router.route("/:postId/comment").post(addComment);

export default router;
