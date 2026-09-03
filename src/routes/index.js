import { Router } from 'express';
import authRoutes from './auth.js';
import applicationRoutes from './applications.js';
import dashboardRoutes from './dashboard.js';

const router = Router();
router.get('/health', (req, res) => res.json({ data: { status: 'ok' } }));
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
