/**
 * @summary
 * In-memory store for Stopwatch instances.
 * Manages the state of stopwatches without external database persistence.
 *
 * @module instances/stopwatch/stopwatchStore
 */

import { StopwatchEntity } from '@/services/stopwatch/stopwatchTypes';
import { STOPWATCH_STATUS, STOPWATCH_DEFAULTS } from '@/constants/stopwatch';

class StopwatchStore {
  private stopwatches: Map<string, StopwatchEntity> = new Map();

  /**
   * Retrieves a stopwatch by ID. Creates a default one if it doesn't exist.
   * @param {string} id - Stopwatch identifier
   * @returns {StopwatchEntity} The stopwatch entity
   */
  getOrInit(id: string): StopwatchEntity {
    if (!this.stopwatches.has(id)) {
      const newStopwatch: StopwatchEntity = {
        id,
        status: STOPWATCH_STATUS.STOPPED,
        startTime: null,
        accumulatedTime: STOPWATCH_DEFAULTS.INITIAL_ACCUMULATED_TIME,
        updatedAt: new Date().toISOString(),
      };
      this.stopwatches.set(id, newStopwatch);
    }
    return this.stopwatches.get(id)!;
  }

  /**
   * Updates the state of a stopwatch.
   * @param {StopwatchEntity} entity - The entity to save
   * @returns {StopwatchEntity} The saved entity
   */
  save(entity: StopwatchEntity): StopwatchEntity {
    this.stopwatches.set(entity.id, entity);
    return entity;
  }
}

export const stopwatchStore = new StopwatchStore();
