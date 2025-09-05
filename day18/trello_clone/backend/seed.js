// Node script to seed a sample user + board + tasks for development only
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Board from './models/Board.js';
import Task from 'models/Task.js';

dotenv.config();

const DB = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trelloClone';

async function main(){
  await mongoose.connect(DB);
  console.log('connected');

  await User.deleteMany({});
  await Board.deleteMany({});
  await Task.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 12);
  const user = await User.create({ username: 'demo', email: 'demo@example.com', passwordHash });

  const board = await Board.create({ name: 'Demo Board', owner: user._id, members: [user._id] });

  await Task.create({ content: 'First task', board: board._id, status: 'todo', order: 1 });
  await Task.create({ content: 'Second task', board: board._id, status: 'in-progress', order: 2 });
  await Task.create({ content: 'Done task', board: board._id, status: 'done', order: 3 });

  console.log('seeded demo user: demo / password123');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
