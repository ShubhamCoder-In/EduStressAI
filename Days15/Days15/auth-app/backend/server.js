import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/authApp");

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
