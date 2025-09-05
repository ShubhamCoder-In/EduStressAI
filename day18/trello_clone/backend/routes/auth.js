import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
const router = express.Router();

const signAccessToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
const signRefreshToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ error: 'user already exists' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, passwordHash });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Set HttpOnly cookie for refresh token
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({ user: { id: user._id, username: user.username }, token: accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.json({ user: { id: user._id, username: user.username }, token: accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

// Refresh access token
router.post('/refresh', async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ error: 'no refresh token' });

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = signAccessToken(payload.id);
    return res.json({ token: accessToken });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'invalid refresh token' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken');
  return res.json({ ok: true });
});

export default router;
