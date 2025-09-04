import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  createdAt: Date;
  online?: boolean;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  online: { type: Boolean, default: false }
});

export default mongoose.model<IUser>("User", UserSchema);
