import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import messageRoutes from "./routes/messages";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chat-app";
mongoose.connect(mongoUri).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error", err);
});

app.get("/", (req, res) => res.json({ ok: true, app: "chat-backend" }));

export default app;
