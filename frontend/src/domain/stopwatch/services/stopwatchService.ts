import { authenticatedClient } from '@/core/lib/api';
import type { StartStopwatchResponse } from '../types';

/**
 * @service StopwatchService
 * @domain Stopwatch
 * @description Handles API communication for stopwatch operations
 */
export const stopwatchService = {
  /**
   * Starts or resumes the stopwatch
   * @param id Stopwatch identifier
   */
  async start(id: string): Promise<StartStopwatchResponse> {
    const { data } = await authenticatedClient.post(`/stopwatch/${id}/start`);
    return data.data;
  },
};
