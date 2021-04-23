import {Router} from 'express';
import { sessionsRoutes } from './sessions.routes';

import {usersRoutes} from './users.routes';

const router = Router();

router.use('/users', usersRoutes)
router.use('/sessions', sessionsRoutes)

export default router;