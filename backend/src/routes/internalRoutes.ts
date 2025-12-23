/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as stopwatchController from '@/api/internal/stopwatch/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Stopwatch routes - /api/internal/stopwatch
 */
router.post('/stopwatch/:id/start', stopwatchController.startHandler);

export default router;
