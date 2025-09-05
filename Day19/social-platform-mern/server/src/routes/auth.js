import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register",
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: "Email already registered" });
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hash });
      const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (e) { next(e); }
  }
);

router.post("/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: "Invalid credentials" });
      const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email, bio: user.bio, avatarUrl: user.avatarUrl } });
    } catch (e) { next(e); }
  }
);

router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) { next(e); }
});

export default router;
