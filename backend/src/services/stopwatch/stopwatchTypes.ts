/**
 * @summary
 * Type definitions for Stopwatch feature.
 *
 * @module services/stopwatch/stopwatchTypes
 */

import { StopwatchStatus } from '@/constants/stopwatch';

/**
 * @interface StopwatchEntity
 * @description Represents the state of a stopwatch instance.
 *
 * @property {string} id - Unique identifier for the stopwatch
 * @property {StopwatchStatus} status - Current operational status
 * @property {number | null} startTime - Timestamp when the current run started (null if not running)
 * @property {number} accumulatedTime - Total time accumulated in milliseconds before the current run
 * @property {string} updatedAt - ISO timestamp of the last state change
 */
export interface StopwatchEntity {
  id: string;
  status: StopwatchStatus;
  startTime: number | null;
  accumulatedTime: number;
  updatedAt: string;
}

/**
 * @interface StopwatchStartRequest
 * @description Parameters required to start/resume the stopwatch.
 */
export interface StopwatchStartRequest {
  id: string;
}
