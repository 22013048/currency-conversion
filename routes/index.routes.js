import { Router } from 'express';
import currencyRoutes from './currency.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/currency', currencyRoutes);
router.use('/health', healthRoutes);

export default router;