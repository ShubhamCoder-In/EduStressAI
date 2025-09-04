import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  conversationId: string;
  from: string;
  to: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  conversationId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>("Message", MessageSchema);
