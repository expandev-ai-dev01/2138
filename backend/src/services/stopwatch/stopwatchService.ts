/**
 * @summary
 * Business logic for Stopwatch feature.
 * Handles state transitions for starting and resuming the count.
 *
 * @module services/stopwatch/stopwatchService
 */

import { stopwatchStore } from '@/instances/stopwatch';
import { STOPWATCH_STATUS } from '@/constants/stopwatch';
import { ServiceError } from '@/utils/serviceError';
import { StopwatchEntity, StopwatchStartRequest } from './stopwatchTypes';
import { stopwatchIdSchema } from './stopwatchValidation';

/**
 * @summary
 * Starts or resumes the stopwatch count.
 *
 * @function stopwatchStart
 * @module services/stopwatch
 *
 * @param {unknown} params - Request parameters containing the stopwatch ID
 * @returns {Promise<StopwatchEntity>} The updated stopwatch entity
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - If ID is invalid
 * @throws {ServiceError} CONFLICT (409) - If stopwatch is already running
 */
export async function stopwatchStart(params: unknown): Promise<StopwatchEntity> {
  // Validate input
  const validation = stopwatchIdSchema.safeParse(params);
  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const stopwatch = stopwatchStore.getOrInit(id);

  // Business Rule: Cannot start if already running
  if (stopwatch.status === STOPWATCH_STATUS.RUNNING) {
    throw new ServiceError('CONFLICT', 'Stopwatch is already running', 409);
  }

  const now = Date.now();
  let newAccumulatedTime = stopwatch.accumulatedTime;

  // If starting from STOPPED, reset accumulated time
  if (stopwatch.status === STOPWATCH_STATUS.STOPPED) {
    newAccumulatedTime = 0;
  }
  // If starting from PAUSED, keep existing accumulated time (Resume)

  const updatedStopwatch: StopwatchEntity = {
    ...stopwatch,
    status: STOPWATCH_STATUS.RUNNING,
    startTime: now,
    accumulatedTime: newAccumulatedTime,
    updatedAt: new Date().toISOString(),
  };

  return stopwatchStore.save(updatedStopwatch);
}
