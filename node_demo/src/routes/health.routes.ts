import { Router } from 'express';
import { getHealthStatus } from '../controllers/healthController.js';

const router: Router = Router();

router.get('/health', getHealthStatus);

export default router;
