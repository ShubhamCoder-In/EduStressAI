import mongoose, { Document, Schema } from "mongoose";

export interface IConversation extends Document {
  members: string[]; // user ids
  createdAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
  members: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IConversation>("Conversation", ConversationSchema);
