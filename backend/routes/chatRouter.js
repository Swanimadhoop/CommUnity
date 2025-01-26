// backend/routes/chatRouter.js
import express from "express";
import { createChat, getChats, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post("/create", createChat); // Create a new chat
router.get("/:postId", getChats); // Fetch chats for a post
router.post("/:chatId/send", sendMessage); // Send a message in a chat

export default router;
