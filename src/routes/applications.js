import { Router } from 'express';
import { create, get, list, remove, update } from '../controllers/applications.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();
router.use(authenticate); router.route('/').post(create).get(list); router.route('/:id').get(get).patch(update).delete(remove);
export default router;
