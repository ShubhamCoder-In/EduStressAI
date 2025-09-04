import Message from "../models/Message";
import { Request, Response } from "express";

export async function getConversationMessages(req: Request, res: Response) {
  const { conversationId } = req.params;
  const messages = await Message.find({ conversationId }).sort({ createdAt: 1 }).limit(100);
  return res.json(messages);
}
