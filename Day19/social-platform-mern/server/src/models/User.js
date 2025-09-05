import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
