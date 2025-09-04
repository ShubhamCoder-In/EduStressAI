import { Router } from "express";
import User from "../models/User";

const router = Router();

// create/get user by username (simple)
router.post("/login", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "username required" });
  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username });
    await user.save();
  }
  res.json(user);
});

router.get("/users", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

export default router;
