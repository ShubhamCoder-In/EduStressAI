import express from "express";
import { body, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// Public profile + posts
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
    res.json({ user, posts });
  } catch (e) { next(e); }
});

// Update profile
router.put("/me",
  auth,
  body("name").optional().isLength({ min: 2 }),
  body("bio").optional().isLength({ max: 200 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { name, bio, avatarUrl } = req.body;
      const updated = await User.findByIdAndUpdate(req.user.id, { name, bio, avatarUrl }, { new: true }).select("-password");
      res.json(updated);
    } catch (e) { next(e); }
  }
);

export default router;
