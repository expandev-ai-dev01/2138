/**
 * @summary
 * Validation schemas for Stopwatch feature.
 *
 * @module services/stopwatch/stopwatchValidation
 */

import { z } from 'zod';

/**
 * Schema for validating stopwatch ID parameter.
 */
export const stopwatchIdSchema = z.object({
  id: z.string().min(1).max(50),
});
