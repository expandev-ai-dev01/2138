import { create } from 'zustand';
import { stopwatchService } from '../services/stopwatchService';
import { triggerFeedback } from '../utils/feedback';
import type { StopwatchStatus } from '../types';

interface StopwatchStore {
  // State
  id: string;
  status: StopwatchStatus;
  startTime: number | null; // Local high-res timestamp reference
  accumulatedTime: number;
  displayTime: number;
  feedbackConfig: {
    sound: boolean;
    haptic: boolean;
  };
  wakeLock: WakeLockSentinel | null;

  // Actions
  start: () => Promise<void>;
  tick: () => void;
  reset: () => void;
  setFeedbackConfig: (config: { sound: boolean; haptic: boolean }) => void;
}

let rafId: number | null = null;

export const useStopwatchStore = create<StopwatchStore>((set, get) => ({
  id: 'default-stopwatch', // Default ID for this simple app
  status: 'STOPPED',
  startTime: null,
  accumulatedTime: 0,
  displayTime: 0,
  feedbackConfig: {
    sound: true,
    haptic: true,
  },
  wakeLock: null,

  start: async () => {
    const { id, status, feedbackConfig } = get();

    if (status === 'RUNNING') return;

    // Immediate feedback
    triggerFeedback(feedbackConfig);

    try {
      // Optimistic update for responsiveness
      const now = performance.now();
      set({ status: 'RUNNING', startTime: now });

      // Start the ticker loop
      const loop = () => {
        get().tick();
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);

      // Request Wake Lock
      if ('wakeLock' in navigator) {
        try {
          const wakeLock = await navigator.wakeLock.request('screen');
          set({ wakeLock });
        } catch {
          // Ignore wake lock errors
        }
      }

      // Sync with backend
      await stopwatchService.start(id);
    } catch (error) {
      console.error('Failed to start stopwatch:', error);
      // Revert state on error if necessary, but for now we keep local state
      // In a real app, we might want to show a toast error
    }
  },

  tick: () => {
    const { startTime, accumulatedTime, status } = get();
    if (status === 'RUNNING' && startTime !== null) {
      const now = performance.now();
      const delta = now - startTime;
      set({ displayTime: accumulatedTime + delta });
    }
  },

  reset: () => {
    if (rafId) cancelAnimationFrame(rafId);
    set({
      status: 'STOPPED',
      startTime: null,
      accumulatedTime: 0,
      displayTime: 0,
    });
    const { wakeLock } = get();
    if (wakeLock) {
      wakeLock.release().catch(() => {});
      set({ wakeLock: null });
    }
  },

  setFeedbackConfig: (config) => set({ feedbackConfig: config }),
}));
