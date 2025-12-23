/**
 * @summary
 * Constants for Stopwatch feature.
 * Defines status enums and default values.
 *
 * @module constants/stopwatch/stopwatchConstants
 */

/**
 * @interface StopwatchStatusType
 * @description Available status for Stopwatch.
 *
 * @property {string} STOPPED - Timer is reset and not running
 * @property {string} RUNNING - Timer is currently counting
 * @property {string} PAUSED - Timer is halted but retains accumulated time
 */
export const STOPWATCH_STATUS = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING',
  PAUSED: 'PAUSED',
} as const;

/** Type representing the STOPWATCH_STATUS constant */
export type StopwatchStatus = (typeof STOPWATCH_STATUS)[keyof typeof STOPWATCH_STATUS];

/**
 * @interface StopwatchDefaultsType
 * @description Default configuration values.
 */
export const STOPWATCH_DEFAULTS = {
  INITIAL_ACCUMULATED_TIME: 0,
  DEFAULT_ID: 'default',
} as const;
