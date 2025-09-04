import { Router } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import { getConversationMessages } from "../controllers/messageController";

const router = Router();

// create conversation
router.post("/conversation", async (req, res) => {
  const { members } = req.body;
  if (!members || !Array.isArray(members) || members.length < 2) return res.status(400).json({ error: "Provide members array with 2 user ids" });
  const conv = new Conversation({ members });
  await conv.save();
  res.json(conv);
});

// get conversation messages
router.get("/conversation/:conversationId/messages", getConversationMessages);

// get messages by user (simple)
router.get("/messages/:userId", async (req, res) => {
  const { userId } = req.params;
  const messages = await Message.find({ $or: [{ from: userId }, { to: userId }] }).sort({ createdAt: -1 }).limit(100);
  res.json(messages);
});

export default router;
