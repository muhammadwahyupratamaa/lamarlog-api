import { Router } from 'express';
import authRoutes from './auth.js';
import applicationRoutes from './applications.js';

const router = Router();
router.get('/health', (req, res) => res.json({ data: { status: 'ok' } }));
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);

export default router;
