export type SessionType = 'focus' | 'shortBreak' | 'longBreak';
export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

export type TimerState = {
  sessionType: SessionType;
  status: TimerStatus;
  focusDurationMs: number;
  cyclePosition: 1 | 2 | 3 | 4;
  startedAt: number | null;
  elapsedBeforePause: number;
};

export type Action =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | { type: 'ADD_FIVE' }
  | { type: 'SUBTRACT_FIVE' }
  | { type: 'TICK_COMPLETE' }
  | { type: 'ADVANCE_TO_NEXT_SESSION' };
