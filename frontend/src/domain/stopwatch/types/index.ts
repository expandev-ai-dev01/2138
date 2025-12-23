export type StopwatchStatus = 'STOPPED' | 'RUNNING' | 'PAUSED';

export interface StopwatchState {
  id: string;
  status: StopwatchStatus;
  startTime: number | null;
  accumulatedTime: number;
  displayTime: number;
  feedbackConfig: {
    sound: boolean;
    haptic: boolean;
  };
}

export interface StartStopwatchResponse {
  id: string;
  status: StopwatchStatus;
  startTime: number;
  accumulatedTime: number;
  updatedAt: string;
}
