/**
 * @summary
 * API controller for Stopwatch feature.
 * Handles HTTP requests for stopwatch operations.
 *
 * @module api/internal/stopwatch/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse } from '@/utils/response';
import { isServiceError } from '@/utils/serviceError';
import { stopwatchStart } from '@/services/stopwatch';

/**
 * @api {post} /api/internal/stopwatch/:id/start Start/Resume Stopwatch
 * @apiName StartStopwatch
 * @apiGroup Stopwatch
 *
 * @apiParam {String} id Stopwatch identifier
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Stopwatch ID
 * @apiSuccess {String} data.status Current status (RUNNING)
 * @apiSuccess {Number} data.startTime Timestamp when started
 * @apiSuccess {Number} data.accumulatedTime Accumulated time in ms
 * @apiSuccess {String} data.updatedAt ISO timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR | CONFLICT)
 * @apiError {String} error.message Error message
 */
export async function startHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await stopwatchStart(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
