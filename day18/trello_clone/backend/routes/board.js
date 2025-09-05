import express from 'express';
import Board from '../models/Board.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create board
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const board = await Board.create({ name, owner: req.userId, members: [req.userId] });
    return res.json(board);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'internal' }); }
});

// List boards for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const boards = await Board.find({ members: req.userId }).sort({ createdAt: -1 });
    return res.json(boards);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'internal' }); }
});

export default router;
