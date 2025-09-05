import express from "express";
import { body, validationResult } from "express-validator";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get feed (latest posts)
router.get("/", async (_req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("user", "name avatarUrl")
      .populate("comments.user", "name avatarUrl")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(posts);
  } catch (e) { next(e); }
});

// Create post
router.post("/",
  auth,
  body("content").isLength({ min: 1, max: 500 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const post = await Post.create({ user: req.user.id, content: req.body.content });
      const populated = await post.populate("user", "name avatarUrl");
      res.status(201).json(populated);
    } catch (e) { next(e); }
  }
);

// Like / Unlike
router.post("/:id/like", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const uid = req.user.id;
    if (!post.likes.map(String).includes(uid)) post.likes.push(uid);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (e) { next(e); }
});

router.post("/:id/unlike", auth, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const uid = req.user.id;
    post.likes = post.likes.filter(id => String(id) != String(uid));
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (e) { next(e); }
});

// Comment
router.post("/:id/comments",
  auth,
  body("text").isLength({ min: 1, max: 300 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
      post.comments.unshift({ user: req.user.id, text: req.body.text });
      await post.save();
      const populated = await Post.findById(req.params.id)
        .populate("user", "name avatarUrl")
        .populate("comments.user", "name avatarUrl");
      res.status(201).json(populated.comments[0]);
    } catch (e) { next(e); }
  }
);

export default router;
