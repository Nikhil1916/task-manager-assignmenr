import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { createTask, getMyTasks, updateTask, deleteTask } from '../controllers/tasks.controller';

const router = Router();

router.use(requireAuth);
router.get('/', getMyTasks);
router.post('/', createTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
