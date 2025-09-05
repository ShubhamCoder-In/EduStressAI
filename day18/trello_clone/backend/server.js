import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import boardsRoutes from "./routes/boards.js";
import tasksRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// CORS - restrict to frontend origin
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

// Connect DB
const DB_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/trelloClone";
mongoose.connect(DB_URL, { autoIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardsRoutes);
app.use('/api/tasks', tasksRoutes);

app.get('/', (req, res) => res.json({ status: 'Trello-like API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
