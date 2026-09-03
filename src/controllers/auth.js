import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import User from '../models/user.js';
import { loginSchema, registerSchema } from '../validators/auth.js';

const tokenFor = (user) => jwt.sign({ sub: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
const response = (res, user, status = 200) => res.status(status).json({ data: { user: user.safe(), token: tokenFor(user) } });

export async function register(req, res) {
  const input = registerSchema.parse(req.body);
  const exists = await User.findOne({ where: { email: input.email } });
  if (exists) return res.status(409).json({ error: { message: 'Email already registered' } });
  const user = await User.create({ name: input.name, email: input.email, passwordHash: await bcrypt.hash(input.password, 12) });
  return response(res, user, 201);
}

export async function login(req, res) {
  const input = loginSchema.parse(req.body);
  const user = await User.findOne({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) return res.status(401).json({ error: { message: 'Invalid email or password' } });
  return response(res, user);
}

export function me(req, res) { res.json({ data: { user: req.user.safe() } }); }
export function logout(req, res) { res.json({ data: { message: 'Logged out. Delete the token client-side.' } }); }
