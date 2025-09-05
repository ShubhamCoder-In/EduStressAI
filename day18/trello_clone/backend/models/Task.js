import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  content: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', taskSchema);
