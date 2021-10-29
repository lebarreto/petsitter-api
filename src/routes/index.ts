import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import UsersController from '../controllers/UsersController';

const router = Router();
const usersController = new UsersController();
const sessionController = new SessionController();

router.post('/users', usersController.create);
router.post('/session', sessionController.execute);

export default router;
