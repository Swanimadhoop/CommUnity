// backend/controllers/chatController.js
import{ Chat } from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    let chat = await Chat.findOne({ postId, participants: { $in: [userId] } });

    if (!chat) {
      chat = await Chat.create({ postId, participants: [userId] });
    }

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error creating chat", error });
  }
};

export const getChats = async (req, res) => {
  const { postId } = req.params;

  try {
    const chats = await Chat.find({ postId }).populate("participants", "name");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chats", error });
  }
};

export const sendMessage = async (req, res) => {
  const { chatId } = req.params;
  const { sender, text } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { messages: { sender, text } } },
      { new: true }
    ).populate("messages.sender", "name");

    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};
