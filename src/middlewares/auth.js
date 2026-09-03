import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/user.js';

export async function authenticate(req, res, next) {
  const token = req.get('authorization')?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return res.status(401).json({ error: { message: 'Authentication required' } });
  try {
    const { sub } = jwt.verify(token, config.jwtSecret);
    const user = await User.findByPk(sub);
    if (!user) throw new Error('Unknown user');
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }
}
