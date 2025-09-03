const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos - list all todos (newest first)
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/todos - create a new todo
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' });

    const todo = new Todo({ text: text.trim() });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/todos/:id - delete todo by id
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Todo.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
