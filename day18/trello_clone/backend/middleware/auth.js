import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    // Token from cookie or Authorization header
    const token = req.cookies?.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Authentication required' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
