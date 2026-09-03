import { Router } from 'express';
import { followUps, summary } from '../controllers/dashboard.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router(); router.use(authenticate); router.get('/summary', summary); router.get('/follow-ups', followUps);
export default router;
