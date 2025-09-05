import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const SECRET = "mini-task-secret";

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  res.json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Protected route
router.get("/me", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, SECRET);
    res.json({ message: "Protected data", userId: decoded.id });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
