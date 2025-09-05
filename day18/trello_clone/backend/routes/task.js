import express from 'express';
import Task from './models/Task.js';
import Board from '../models/Board.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { content, boardId, status, assignedTo, order } = req.body;
    // verify user is member of board
    const board = await Board.findById(boardId);
    if (!board) return res.status(404).json({ error: 'board not found' });
    if (!board.members.map(String).includes(String(req.userId))) return res.status(403).json({ error: 'not a member' });

    const task = await Task.create({ content, board: boardId, status: status || 'todo', assignedTo, order });
    return res.json(task);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'internal' }); }
});

// Get tasks by board
router.get('/board/:boardId', authMiddleware, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(404).json({ error: 'board not found' });
    if (!board.members.map(String).includes(String(req.userId))) return res.status(403).json({ error: 'not a member' });

    const tasks = await Task.find({ board: req.params.boardId }).sort({ order: 1, createdAt: 1 });
    return res.json(tasks);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'internal' }); }
});

// Update task (status / content / order)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('board');
    if (!task) return res.status(404).json({ error: 'task not found' });
    if (!task.board.members.map(String).includes(String(req.userId))) return res.status(403).json({ error: 'not a member' });

    const updates = req.body;
    Object.assign(task, updates);
    await task.save();
    return res.json(task);
  } catch (err) { console.error(err); return res.status(500).json({ error: 'internal' }); }
});

export default router;
